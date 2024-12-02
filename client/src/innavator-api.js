//const INNAVATOR_API_URL = 'http://localhost:8000/api';
const INNAVATOR_API_URL = 'https://server-f0e9-892865245121.us-central1.run.app/api';

const baseRequest = {
    credentials: 'include'
};
const invalidTokens = {
    "error": "Not logged in."
};

let access_token = '';
let refresh_token = undefined;
let logged_in = false;
let this_user = 0;

export const get_logged_in = () => {
    return logged_in;
}

export const get_this_user = () => {
    return this_user;
}

// https://stackoverflow.com/a/69058154
const _isTokenExpired = token => Date.now() >= (JSON.parse(atob(token.split('.')[1]))).exp * 1000;

// begin code extracted from Avocano
const _makeAPIrequest = async (uri, init) => {
    let url = `${INNAVATOR_API_URL}/${uri}`;
    let apiError = { url: url };
    let response, data;

    try {
        response = await fetch(url, init);
        // CHANGED: don't assume that we get a response body even for successful queries
        if ((await response.clone().arrayBuffer()).byteLength > 0) {
            data = await response.clone().json();
        }
        else {
            data = {"success" : true};
        }
    } catch (error) {
        console.error(error);

        apiError.error = error.toString();

        // Based on common reasons for failure cases, make nicer messages

        // Network Errors
        if (error instanceof TypeError && error.message == 'Failed to fetch') {
            apiError.message = `The API didn't respond. Is the API server up?`;

            // Django Errors
        } else if (
            error instanceof SyntaxError &&
            error.message.includes('is not valid JSON')
        ) {
            apiError.message = `The server returned invalid JSON. Is Django returning an error?`;
            apiError.error = `Error: "${response.statusText}"`;
            apiError.extra_error = getDjangoError(await response.text());

            // Fallback Error
        } else {
            apiError.message = `Request encountered an error: ${error.name}`;
        }
        return { apiError };
    }

    // Capture not OK responses
    if (!response?.ok) {
        apiError.message = await response?.text();
        apiError.error = `Server returned ${response?.status} - ${response?.statusText}`;
        return { apiError };
    }

    return data;
};
// end code extracted from Avocano

const _apiGET = async (uri, headers) => {
    return await _makeAPIrequest(uri, {
        method: 'GET',
        headers: headers,
        ...baseRequest
    });
};
const _anonGetAPI = async uri => {
    return await _apiGET(uri, {
        'Accept': 'application/json'
    });
};

const _apiDELETE = async (uri, headers) => {
    const token = await _anonGetAPI('csrf_token/');
    headers['X-CSRFToken'] = token.csrf_token;
    return await _makeAPIrequest(uri, {
        method: 'DELETE',
        headers: headers,
        ...baseRequest
    });
};
const _apiMUT = async (uri, headers, json, method) => {
    const token = await _anonGetAPI('csrf_token/');
    headers['X-CSRFToken'] = token.csrf_token;
    return await _makeAPIrequest(uri, {
        method: method,
        headers: headers,
        body: JSON.stringify(json),
        ...baseRequest
    });
};
const _anonPostAPI = async (uri, json) => {
    return await _apiMUT(uri, {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }, json, "POST");
};
// there will never be other anonymous mutable requests (fingers crossed)

const _checkToken = async () => {
    if (access_token) {
        if (!_isTokenExpired(access_token)) return true;
    }
    if (refresh_token = localStorage.getItem("refresh_token")) {
        let try_refreshing_token = await _anonPostAPI("jwt_token/refresh/", { "refresh": refresh_token });
        if (try_refreshing_token["access"]) {
            access_token = try_refreshing_token["access"];
            return true;
        }
    }
    return false;
};

const getAPI = async uri => {
    if (await _checkToken()) {
        return await _apiGET(uri, {
            'Accept': 'application/json',
            'Authorization': `Bearer ${access_token}`
        });
    }
    return _anonGetAPI(uri);
};
const postAPI = async (uri, json) => {
    if (await _checkToken()) {
        return await _apiMUT(uri, {
            'Accept': 'application/json',
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        }, json, "POST");
    }
    return _anonPostAPI(uri, json);
};
// there is no reason to ever do these other methods anonymously
const deleteAPI = async uri => {
    if (await _checkToken()) {
        return await _apiDELETE(uri, {
            'Accept': 'application/json',
            'Authorization': `Bearer ${access_token}`
        });
    }
    return invalidTokens;
};
const putAPI = async (uri, json) => {
    if (await _checkToken()) {
        return await _apiMUT(uri, {
            'Accept': 'application/json',
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        }, json, "PUT");
    }
    return invalidTokens;
};
const patchAPI = async (uri, json) => {
    if (await _checkToken()) {
        return await _apiMUT(uri, {
            'Accept': 'application/json',
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        }, json, "PATCH");
    }
    return invalidTokens;
};

// begin actual API

// special

export const register = async (username, full_name, preferred_name, major, email, password) => {
    return await postAPI('users/', {
        "user": {
            "username": username,
            "email": email,
            "password": password
        },
        "full_name": full_name,
        "preferred_name": preferred_name,
        "major": major
    });
};
export const who_am_i = async () => {
    let who_am_i_response = await getAPI("who_am_i/");
    logged_in = who_am_i_response["logged_in"] ? true : false;
    this_user = who_am_i_response["snowflake_id"] ? who_am_i_response["snowflake_id"] : 0;
    return who_am_i_response;
};
export const login = async (email, password) => {
    let token_response = await postAPI('jwt_token/', {
        "username": email, // sic: auth system has no convenient way to rename this field
        "password": password
    });
    if (token_response["apiError"]) {
        return token_response;
    }
    access_token = token_response["access"];
    localStorage.setItem("refresh_token", token_response["refresh"]);

    return await who_am_i();
};
export const logout = async () => {
    access_token = '';
    logged_in = false;
    this_user = 0;
    localStorage.removeItem("refresh_token");

    return await who_am_i();
};

// GET: `csrf_token/` and `who_am_i/` are specially handled above

export const listUsers = async () => {
    return await getAPI(`users/`);
};
export const fetchUser = async user => {
    return await getAPI(`users/${user}/`);
};
export const fetchPalette = async user => {
    return await getAPI(`users/${user}/get_palette/`);
};
export const fetchPortfolio = async user => {
    return await getAPI(`users/${user}/portfolio/`);
};
export const fetchMentors = async () => {
    return await getAPI(`users/${this_user}/mentors/`);
};
export const fetchMentees = async () => {
    return await getAPI(`users/${this_user}/mentees/`);
};
export const fetchRequestsAsMentorFromMe = async () => {
    return await getAPI(`users/${this_user}/requests_as_mentor_from_me/`);
};
export const fetchRequestsAsMentorToMe = async () => {
    return await getAPI(`users/${this_user}/requests_as_mentor_to_me/`);
};
export const fetchRequestsAsMenteeFromMe = async () => {
    return await getAPI(`users/${this_user}/requests_as_mentee_from_me/`);
};
export const fetchRequestsAsMenteeToMe = async () => {
    return await getAPI(`users/${this_user}/requests_as_mentee_to_me/`);
};
export const fetchGroupRequestsFromMe = async () => {
    return await getAPI(`users/${this_user}/group_requests_from_me/`);
};
export const fetchGroupRequestsToMe = async () => {
    return await getAPI(`users/${this_user}/group_requests_to_me/`);
};
export const fetchMyWillingnessesToTutor = async () => {
    return await getAPI(`users/${this_user}/willingnesses_to_tutor/`);
};

export const listGroups = async () => {
    return await getAPI(`groups/`);
};
export const listAllGroups = async () => {
    return await getAPI(`groups/all/`);
};
export const listClubs = async () => {
    return await getAPI(`groups/clubs/`);
};
export const fetchGroup = async group => {
    return await getAPI(`groups/${group}/`);
};
export const listMembers = async group => {
    return await getAPI(`groups/${group}/members/`);
};
export const requestsFromGroup = async group => {
    return await getAPI(`groups/${group}/requests_from_group/`);
};
export const requestsToGroup = async group => {
    return await getAPI(`groups/${group}/requests_to_group/`);
};
export const listChannels = async group => {
    return await getAPI(`groups/${group}/channels/`);
};
export const listGroupProjects = async group => {
    return await getAPI(`groups/${group}/projects/`);
};
export const listEvents = async group => {
    return await getAPI(`groups/${group}/events/`);
};

export const unreadMessageCount = async channel => {
    return await getAPI(`channels/${channel}/unread_message_count/`);
};

export const fetchMessage = async message => {
    return await getAPI(`messages/${message}/`);
};

export const listRoles = async () => {
    return await getAPI(`roles/`);
};
export const fetchRole = async role => {
    return await getAPI(`roles/${role}/`);
};
export const listCommissionRequestsForRole = async role => {
    return await getAPI(`roles/${role}/get_commission_requests/`);
};
export const listProjectsNeedingRole = async role => {
    return await getAPI(`roles/${role}/get_projects/`);
};

export const listProjects = async () => {
    return await getAPI(`projects/`);
};
export const getProject = async project => {
    return await getAPI(`projects/${project}/`);
};
export const listProjectMembers = async project => {
    return await getAPI(`projects/${project}/members/`);
};
export const listActiveProjectMembers = async project => {
    return await getAPI(`projects/${project}/active_members/`);
};
export const requestsFromProject = async project => {
    return await getAPI(`projects/${project}/requests_from_project/`);
};
export const requestsToProject = async project => {
    return await getAPI(`projects/${project}/requests_to_project/`);
};

export const listCommissionRequests = async () => {
    return await getAPI(`commissions/`);
};
export const fetchCommissionRequest = async commission_request => {
    return await getAPI(`commissions/${commission_request}/`);
};

export const fetchEvent = async event_snowflake => {
    return await getAPI(`events/${event_snowflake}/`);
};

export const listPortfolioEntries = async () => {
    return await getAPI(`portfolio_entries/`);
};
export const fetchPortfolioEntry = async portfolio_entry => {
    return await getAPI(`portfolio_entries/${portfolio_entry}/`);
};

export const listSubjects = async () => {
    return await getAPI(`subjects/`);
};
export const fetchSubject = async subject => {
    return await getAPI(`subjects/${subject}/`);
};
export const fetchSubjectTutors = async subject => {
    return await getAPI(`subjects/${subject}/tutors/`);
};

// DELETE

export const removeMentor = async user => {
    return await deleteAPI(`users/${user}/remove_mentor/`);
};
export const removeMentee = async user => {
    return await deleteAPI(`users/${user}/remove_mentee/`);
};

export const deleteGroup = async group => {
    return await deleteAPI(`groups/${group}/`);
};
export const leaveGroup = async group => {
    return await deleteAPI(`groups/${group}/leave/`);
};

export const deleteChannel = async channel => {
    return await deleteAPI(`channels/${channel}/`);
};

export const deleteMessage = async message => {
    return await deleteAPI(`messages/${message}/`);
};

export const deleteProject = async project => {
    return await deleteAPI(`projects/${project}/`);
};
export const leaveProject = async project => {
    return await deleteAPI(`projects/${project}/leave/`);
};

export const deleteCommissionRequest = async commission_request => {
    return await deleteAPI(`commissions/${commission_request}/`);
};

export const deleteEvent = async event => {
    return await deleteAPI(`events/${event}/`);
};

export const deletePortfolioEntry = async portfolio_entry => {
    return await deleteAPI(`portfolio_entries/${portfolio_entry}/`);
};

export const removeTutorWillingness = async subject => {
    return await deleteAPI(`subjects/${subject}/remove_tutor_willingness/`)
};

// POST: `jwt_token/`, `jwt_token/refresh/`, and `users/` are handled specially above

export const requestMentor = async user => {
    return await postAPI(`users/${user}/request_as_mentor/`, {});
};
export const requestMentee = async user => {
    return await postAPI(`users/${user}/request_as_mentee/`, {});
};
export const createPortfolioEntry = async data => {
    return await postAPI(`users/${this_user}/create_portfolio_entry/`, data);
};

export const createGroup = async name => {
    return await postAPI(`groups/`, {'name': name});
};
export const createChannel = async (group, name) => {
    return await postAPI(`groups/${group}/create_channel/`, {'name': name});
};
export const createProject = async (group, name) => {
    return await postAPI(`groups/${group}/create_project/`, {'name': name});
};
// awkwardly named because `createEvent` is reserved JavaScript
export const eventCreate = async (group, name, description, start) => {
    return await postAPI(`groups/${group}/create_event/`, {'name': name, 'description': description, 'start_time': start})
};
export const inviteUserToGroup = async (group, user) => {
    return await postAPI(`groups/${group}/invite/`, {'user': user});
};
export const requestToJoinGroup = async group => {
    return await postAPI(`groups/${group}/request_to_join/`, {});
};
export const removeUserFromGroup = async (group, user) => {
    return await postAPI(`groups/${group}/remove_user/`, {'user': user});
};

export const listMessages = async channel => {
    return await postAPI(`channels/${channel}/messages/`, {});
};
export const sendMessage = async (channel, contents) => {
    return await postAPI(`channels/${channel}/create_message/`, {'contents': contents});
};

export const inviteUserToProject = async (project, user, role) => {
    return await postAPI(`projects/${project}/invite/`, {'user': user, 'role': role});
};
export const requestToJoinProject = async (project, role) => {
    return await postAPI(`projects/${project}/request_to_join/`, {'role': role});
};
export const removeUserFromProject = async (project, user) => {
    return await postAPI(`projects/${project}/remove_user/`, {'user': user});
};
export const alterRole = async (project, user, role) => {
    return await postAPI(`projects/${project}/alter_role/`, {'user': user, 'role': role});
};
export const addNeededRole = async (project, role) => {
    return await postAPI(`projects/${project}/add_needed_role/`, {'role': role});
};
export const removeNeededRole = async (project, role) => {
    return await postAPI(`projects/${project}/remove_needed_role/`, {'role': role});
};

export const createRole = async (name) => {
    return await postAPI(`roles/`, {'name': name});
};

export const createCommissionRequest = async (role, name, description) => {
    return await postAPI(`commissions/`, {'role': role, 'name': name, 'description': description});
};

export const addTutorWillingness = async subject => {
    return await postAPI(`subjects/${subject}/add_tutor_willingness/`, {})
};

// PATCH

export const patchUser = async diff => {
    return await patchAPI(`users/${this_user}/`, diff);
};
export const patchPalette = async diff => {
    return await patchAPI(`users/${this_user}/patch_palette/`, diff);
};
export const acceptMentor = async user => {
    return await patchAPI(`users/${user}/accept_mentor_request/`, {});
};
export const acceptMentee = async user => {
    return await patchAPI(`users/${user}/accept_mentee_request/`, {});
};

export const patchGroup = async snowflake_and_diff => {
    let {group, ...diff} = snowflake_and_diff;
    return await patchAPI(`groups/${group}/`, diff);
};
export const acceptInviteToGroup = async group => {
    return await patchAPI(`groups/${group}/accept_invite/`, {});
};
export const acceptJoinRequestToGroup = async (group, user) => {
    return await patchAPI(`groups/${group}/accept_join_request/`, {'user': user});
};

export const patchChannel = async snowflake_and_diff => {
    let {channel, ...diff} = snowflake_and_diff;
    return await patchAPI(`channels/${channel}/`, diff);
};

export const patchMessage = async snowflake_and_diff => {
    let {message, ...diff} = snowflake_and_diff;
    return await patchAPI(`messages/${message}/`, diff);
};

export const patchProject = async snowflake_and_diff => {
    let {project, ...diff} = snowflake_and_diff;
    return await patchAPI(`projects/${project}/`, diff);
};
export const acceptInviteToProject = async project => {
    return await patchAPI(`projects/${project}/accept_invite/`, {});
};
export const acceptJoinRequestToProject = async (project, user) => {
    return await patchAPI(`projects/${project}/accept_join_request/`, {'user': user});
};

export const patchCommissionRequest = async snowflake_and_diff => {
    let {commission_request, ...diff} = snowflake_and_diff;
    return await patchAPI(`commissions/${commission_request}/`, diff);
};

export const patchEvent = async snowflake_and_diff => {
    let {event, ...diff} = snowflake_and_diff;
    return await patchAPI(`events/${event}/`, diff);
};

export const patchPortfolioEntry = async snowflake_and_diff => {
    let {portfolio_entry, ...diff} = snowflake_and_diff;
    return await patchAPI(`portfolio_entries/${portfolio_entry}/`, diff);
};

who_am_i();
