#!/usr/bin/python

from snowflake import SnowflakeGenerator

innavator_slowflake_generator = SnowflakeGenerator(instance=0, epoch=1729694252000)
"""
    `epoch` must never change: It represents the base of the timestamp system.\n
    `instance` might need a migration once there's multiple concurrent servers.
"""

def get_snowflake_id():
    """
        Returns a unique integer per call based off of internal configuration
        and the current time.
    """
    return innavator_slowflake_generator.__next__()
