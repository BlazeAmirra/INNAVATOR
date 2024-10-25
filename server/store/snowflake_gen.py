# end Google code

from snowflake import SnowflakeGenerator

innavator_slowflake_generator = SnowflakeGenerator(instance=0, epoch=1729694252000)
"""
    `epoch` must never change: It represents the base of the timestamp system.\n
    `instance` might need a migration once there's multiple concurrent servers.
"""

