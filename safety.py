import math
import datetime

def time_ago_weeks(past_datetime):
    """
    Calculate the time difference in weeks (as a float) between the current time and a given datetime.
    
    :param past_datetime: A datetime object representing the past event.
    :return: A float representing the time difference in weeks.
    """
    # Get the current datetime
    now = datetime.datetime.now()

    
    # Calculate the time difference in days
    delta = now - past_datetime
    
    # Convert the time difference to weeks (1 week = 7 days)
    weeks = delta.days / 7
    
    return weeks

def haversine(lat1, lon1, lat2, lon2):
    # Convert degrees to radians
    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])
    
    # Differences in coordinates
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    
    # Haversine formula
    a = math.sin(dlat / 2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    
    # Radius of Earth in kilometers
    R = 6371
    
    # Calculate the distance
    distance = R * c
    return distance

def safety_index(total_arr, a, b):
    sum = 0
    for arr in total_arr[1]:
        sum += ((a * arr['dangerousness']) / (b * (haversine(total_arr[0][0], total_arr[0][1], arr['location']['coordinates'][0], arr['location']['coordinates'][1]) * time_ago_weeks(arr['datetime']))))
    print(sum)
    return sum

arr = [[-79.384, 43.65618], [{'location': {'type': 'Point', 'coordinates': [-79.3799562462733, 43.6540727931765]}, 'datetime': datetime.datetime(2019, 1, 31, 5, 0), 'crime': 'Assault', 'dangerousness': 70},
{'location': {'type': 'Point', 'coordinates': [-79.3799562462733, 43.6540727931765]}, 'datetime': datetime.datetime(2019, 1, 22, 5, 0), 'crime': 'Assault', 'dangerousness': 70},
{'location': {'type': 'Point', 'coordinates': [-79.3799562462733, 43.6540727931765]}, 'datetime': datetime.datetime(2019, 1, 13, 5, 0), 'crime': 'Assault', 'dangerousness': 70},
{'location': {'type': 'Point', 'coordinates': [-79.3799562462733, 43.6540727931765]}, 'datetime': datetime.datetime(2019, 1, 12, 5, 0), 'crime': 'Assault', 'dangerousness': 70},
{'location': {'type': 'Point', 'coordinates': [-79.3799562462733, 43.6540727931765]}, 'datetime': datetime.datetime(2019, 1, 2, 5, 0), 'crime': 'Theft Over - Shoplifting', 'dangerousness': 35},
{'location': {'type': 'Point', 'coordinates': [-79.3799562462733, 43.6540727931765]}, 'datetime': datetime.datetime(2018, 12, 22, 5, 0), 'crime': 'Theft Over', 'dangerousness': 40}]]
safety_index(arr, 1, 1)