//const API_URL = 'http://localhost:8000/api';
const API_URL = 'https://server-f0e9-892865245121.us-central1.run.app/api';

const baseRequest = {
    credentials: 'include'
};
const invalidTokens = {
    "error": "Not logged in."
};

let access_token = '';
let logged_in = false;
let this_user = 0;

// https://stackoverflow.com/a/69058154
const _isTokenExpired = token => Date.now() >= (JSON.parse(atob(token.split('.')[1]))).exp * 1000;

// begin code extracted from Avocano
const _makeAPIrequest = async (uri, init) => {
    let url = `${API_URL}/${uri}`;
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

const register = async (username, full_name, preferred_name, major, email, password) => {
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
const who_am_i = async () => {
    let who_am_i_response = await getAPI("who_am_i/");
    logged_in = who_am_i_response["logged_in"] ? true : false;
    this_user = who_am_i_response["snowflake_id"] ? who_am_i_response["snowflake_id"] : 0;
    return who_am_i_response;
};
const login = async (email, password) => {
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
const logout = async () => {
    access_token = '';
    logged_in = false;
    this_user = 0;
    localStorage.removeItem("refresh_token");

    return await who_am_i();
};

// GET: `csrf_token/` and `who_am_i/` are specially handled above

const listUsers = async () => {
    return await getAPI(`users/`);
};
const fetchUser = async user => {
    return await getAPI(`users/${user}/`);
};
const fetchPalette = async user => {
    return await getAPI(`users/${user}/get_palette/`);
};
const fetchPortfolio = async user => {
    return await getAPI(`users/${user}/portfolio/`);
};
const fetchMentors = async () => {
    return await getAPI(`users/${this_user}/mentors/`);
};
const fetchMentees = async () => {
    return await getAPI(`users/${this_user}/mentees/`);
};
const fetchRequestsAsMentorFromMe = async () => {
    return await getAPI(`users/${this_user}/requests_as_mentor_from_me/`);
};
const fetchRequestsAsMentorToMe = async () => {
    return await getAPI(`users/${this_user}/requests_as_mentor_to_me/`);
};
const fetchRequestsAsMenteeFromMe = async () => {
    return await getAPI(`users/${this_user}/requests_as_mentee_from_me/`);
};
const fetchRequestsAsMenteeToMe = async () => {
    return await getAPI(`users/${this_user}/requests_as_mentee_to_me/`);
};
const fetchGroupRequestsFromMe = async () => {
    return await getAPI(`users/${this_user}/group_requests_from_me/`);
};
const fetchGroupRequestsToMe = async () => {
    return await getAPI(`users/${this_user}/group_requests_to_me/`);
};

const listGroups = async () => {
    return await getAPI(`groups/`);
};
const listAllGroups = async () => {
    return await getAPI(`groups/all/`);
};
const listClubs = async () => {
    return await getAPI(`groups/clubs/`);
};
const fetchGroup = async group => {
    return await getAPI(`groups/${group}/`);
};
const listMembers = async group => {
    return await getAPI(`groups/${group}/members/`);
};
const requestsFromGroup = async group => {
    return await getAPI(`groups/${group}/requests_from_group/`);
};
const requestsToGroup = async group => {
    return await getAPI(`groups/${group}/requests_to_group/`);
};
const listChannels = async group => {
    return await getAPI(`groups/${group}/channels/`);
};
const listGroupProjects = async group => {
    return await getAPI(`groups/${group}/projects/`);
};
const listEvents = async group => {
    return await getAPI(`groups/${group}/events/`);
};

const unreadMessageCount = async channel => {
    return await getAPI(`channels/${channel}/unread_message_count/`);
};

const fetchMessage = async message => {
    return await getAPI(`messages/${message}/`);
};

const listRoles = async () => {
    return await getAPI(`roles/`);
};
const fetchRole = async role => {
    return await getAPI(`roles/${role}/`);
};
const listCommissionRequestsForRole = async role => {
    return await getAPI(`roles/${role}/get_commission_requests/`);
};
const listProjectsNeedingRole = async role => {
    return await getAPI(`roles/${role}/get_projects/`);
};

const listProjects = async () => {
    return await getAPI(`projects/`);
};
const getProject = async project => {
    return await getAPI(`projects/${project}/`);
};
const listProjectMembers = async project => {
    return await getAPI(`projects/${project}/members/`);
};
const listActiveProjectMembers = async project => {
    return await getAPI(`projects/${project}/active_members/`);
};
const requestsFromProject = async project => {
    return await getAPI(`projects/${project}/requests_from_project/`);
};
const requestsToProject = async project => {
    return await getAPI(`projects/${project}/requests_to_project/`);
};

const listCommissionRequests = async () => {
    return await getAPI(`commissions/`);
};
const fetchCommissionRequest = async commission_request => {
    return await getAPI(`commissions/${commission_request}/`);
};

const fetchEvent = async event_snowflake => {
    return await getAPI(`events/${event_snowflake}/`);
};

const listPortfolioEntries = async () => {
    return await getAPI(`portfolio_entries/`);
};
const fetchPortfolioEntry = async portfolio_entry => {
    return await getAPI(`portfolio_entries/${portfolio_entry}/`);
};

const listSubjects = async () => {
    return await getAPI(`subjects/`);
};
const fetchSubject = async subject => {
    return await getAPI(`subjects/${subject}/`);
};
const fetchSubjectTutors = async subject => {
    return await getAPI(`subjects/${subject}/tutors/`);
};

// DELETE

const removeMentor = async user => {
    return await deleteAPI(`users/${user}/remove_mentor/`);
};
const removeMentee = async user => {
    return await deleteAPI(`users/${user}/remove_mentee/`);
};

const deleteGroup = async group => {
    return await deleteAPI(`groups/${group}/`);
};
const leaveGroup = async group => {
    return await deleteAPI(`groups/${group}/leave/`);
};

const deleteChannel = async channel => {
    return await deleteAPI(`channels/${channel}/`);
};

const deleteMessage = async message => {
    return await deleteAPI(`messages/${message}/`);
};

const deleteProject = async project => {
    return await deleteAPI(`projects/${project}/`);
};
const leaveProject = async project => {
    return await deleteAPI(`projects/${project}/leave/`);
};

const deleteCommissionRequest = async commission_request => {
    return await deleteAPI(`commissions/${commission_request}/`);
};

const deleteEvent = async event => {
    return await deleteAPI(`events/${event}/`);
};

const deletePortfolioEntry = async portfolio_entry => {
    return await deleteAPI(`portfolio_entries/${portfolio_entry}/`);
};

const removeTutorWillingness = async subject => {
    return await deleteAPI(`subjects/${subject}/remove_tutor_willingness/`)
};

// POST: `jwt_token/`, `jwt_token/refresh/`, and `users/` are handled specially above

const requestMentor = async user => {
    return await postAPI(`users/${user}/request_as_mentor/`, {});
};
const requestMentee = async user => {
    return await postAPI(`users/${user}/request_as_mentee/`, {});
};
const createPortfolioEntry = async name => {
    return await postAPI(`users/${this_user}/create_portfolio_entry/`, {'name': name});
};

const createGroup = async name => {
    return await postAPI(`groups/`, {'name': name});
};
const createChannel = async (group, name) => {
    return await postAPI(`groups/${group}/create_channel/`, {'name': name});
};
const createProject = async (group, name) => {
    return await postAPI(`groups/${group}/create_project/`, {'name': name});
};
// awkwardly named because `createEvent` is reserved JavaScript
const eventCreate = async (group, name, description, start) => {
    return await postAPI(`groups/${group}/create_event/`, {'name': name, 'description': description, 'start_time': start})
};
const inviteUserToGroup = async (group, user) => {
    return await postAPI(`groups/${group}/invite/`, {'user': user});
};
const requestToJoinGroup = async group => {
    return await postAPI(`groups/${group}/request_to_join/`, {});
};
const removeUserFromGroup = async (group, user) => {
    return await postAPI(`groups/${group}/remove_user/`, {'user': user});
};

const listMessages = async channel => {
    return await postAPI(`channels/${channel}/messages/`, {});
};
const sendMessage = async (channel, contents) => {
    return await postAPI(`channels/${channel}/create_message/`, {'contents': contents});
};

const inviteUserToProject = async (project, user, role) => {
    return await postAPI(`projects/${project}/invite/`, {'user': user, 'role': role});
};
const requestToJoinProject = async (project, role) => {
    return await postAPI(`projects/${project}/request_to_join/`, {'role': role});
};
const removeUserFromProject = async (project, user) => {
    return await postAPI(`projects/${project}/remove_user/`, {'user': user});
};
const alterRole = async (project, user, role) => {
    return await postAPI(`projects/${project}/alter_role/`, {'user': user, 'role': role});
};
const addNeededRole = async (project, role) => {
    return await postAPI(`projects/${project}/add_needed_role/`, {'role': role});
};
const removeNeededRole = async (project, role) => {
    return await postAPI(`projects/${project}/remove_needed_role/`, {'role': role});
};

const createRole = async (name) => {
    return await postAPI(`roles/`, {'name': name});
};

const createCommissionRequest = async (role, name, description) => {
    return await postAPI(`commissions/`, {'role': role, 'name': name, 'description': description});
};

const addTutorWillingness = async subject => {
    return await postAPI(`subjects/${subject}/add_tutor_willingness/`, {})
};

// PATCH

const patchUser = async diff => {
    return await patchAPI(`users/${this_user}/`, diff);
};
const patchPalette = async diff => {
    return await patchAPI(`users/${this_user}/patch_palette/`, diff);
};
const acceptMentor = async user => {
    return await patchAPI(`users/${user}/accept_mentor_request/`, {});
};
const acceptMentee = async user => {
    return await patchAPI(`users/${user}/accept_mentee_request/`, {});
};

const patchGroup = async snowflake_and_diff => {
    let {group, ...diff} = snowflake_and_diff;
    return await patchAPI(`groups/${group}/`, diff);
};
const acceptInviteToGroup = async group => {
    return await patchAPI(`groups/${group}/accept_invite/`, {});
};
const acceptJoinRequestToGroup = async (group, user) => {
    return await patchAPI(`groups/${group}/accept_join_request/`, {'user': user});
};

const patchChannel = async snowflake_and_diff => {
    let {channel, ...diff} = snowflake_and_diff;
    return await patchAPI(`channels/${channel}/`, diff);
};

const patchMessage = async snowflake_and_diff => {
    let {message, ...diff} = snowflake_and_diff;
    return await patchAPI(`messages/${message}/`, diff);
};

const patchProject = async snowflake_and_diff => {
    let {project, ...diff} = snowflake_and_diff;
    return await patchAPI(`projects/${project}/`, diff);
};
const acceptInviteToProject = async project => {
    return await patchAPI(`projects/${project}/accept_invite/`, {});
};
const acceptJoinRequestToProject = async (project, user) => {
    return await patchAPI(`projects/${project}/accept_join_request/`, {'user': user});
};

const patchCommissionRequest = async snowflake_and_diff => {
    let {commission_request, ...diff} = snowflake_and_diff;
    return await patchAPI(`commissions/${commission_request}/`, diff);
};

const patchEvent = async snowflake_and_diff => {
    let {event, ...diff} = snowflake_and_diff;
    return await patchAPI(`events/${event}/`, diff);
};

const patchPortfolioEntry = async snowflake_and_diff => {
    let {portfolio_entry, ...diff} = snowflake_and_diff;
    return await patchAPI(`portfolio_entries/${portfolio_entry}/`, diff);
};

who_am_i();
