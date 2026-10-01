import platform
import socket

import psutil


def get_system_info():
    memory = psutil.virtual_memory()
    disk = psutil.disk_usage("/")

    # Battery
    battery = psutil.sensors_battery()

    battery_info = None

    if battery:
        battery_info = {
            "charge_percent": battery.percent,
            "charging": battery.power_plugged,
            "time_remaining_minutes": (
                round(battery.secsleft / 60)
                if battery.secsleft not in (
                    psutil.POWER_TIME_UNLIMITED,
                    psutil.POWER_TIME_UNKNOWN,
                )
                else None
            ),
        }

    # Network
    interfaces = []

    for interface_name, addresses in psutil.net_if_addrs().items():

        interface_info = {
            "name": interface_name,
            "ipv4": None,
            "ipv6": None,
            "mac": None,
            "netmask": None,
        }

        for address in addresses:

            if address.family == socket.AF_INET:
                interface_info["ipv4"] = address.address
                interface_info["netmask"] = address.netmask

            elif address.family == socket.AF_INET6:
                interface_info["ipv6"] = address.address

            elif address.family == psutil.AF_LINK:
                interface_info["mac"] = address.address

        interfaces.append(interface_info)

    network_io = psutil.net_io_counters()

    return {
        "hostname": platform.node(),
        "os": platform.system(),
        "os_version": platform.version(),

        "cpu_usage_percent": psutil.cpu_percent(interval=0.5),

        "memory": {
            "total_gb": round(memory.total / (1024 ** 3), 2),
            "used_gb": round(memory.used / (1024 ** 3), 2),
            "usage_percent": memory.percent,
        },

        "disk": {
            "total_gb": round(disk.total / (1024 ** 3), 2),
            "used_gb": round(disk.used / (1024 ** 3), 2),
            "usage_percent": disk.percent,
        },

        "battery": battery_info,

        "network": {
            "interfaces": interfaces,
            "bytes_sent": network_io.bytes_sent,
            "bytes_received": network_io.bytes_recv,
        },
    }