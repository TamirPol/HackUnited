import math
import datetime
from getNearbyCrime import getNearbyCrime
from routeAPI import route_reader_for_index, route_generator, origin, destination
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

def safety_index_per_point(point_arr, a, b):
    print('hi')
    sum = 0
    print(point_arr[1])
    for arr in point_arr[1]:
        print('summing point')
        sum += ((a * arr['dangerousness']) / (b * (haversine(point_arr[0][0], point_arr[0][1], arr['location']['coordinates'][0], arr['location']['coordinates'][1]) * time_ago_weeks(arr['datetime']))))
    print(sum)
    return sum

def safety_index(route_arr, dist):
    print('index starting')
    sum = 0
    for arr in route_arr:
        print('this is safetyindex')
        point_sum = safety_index_per_point(arr, 1, 1)
        sum += point_sum
    sum /= dist
    return sum
    
def rerank(routes):
    for route in routes:
        print(route)
        print("AAAAAAA")
        print(route['coordinates'])
        print('starting')
        crime = getNearbyCrime(route['coordinates'][::10])
        print(crime[1][1])
        print("SAAAAAAAAAAAAA")
        route['score'] = safety_index(crime , route['distance'])
    reranked = sorted(routes, key=lambda x: x['score'])
    fastest = max(routes, key=lambda x: x['duration'])
    final = {
        'best': reranked[0],
        'fastest': fastest[0],
        'alternatives': reranked[1:]
                     }
    return final


routes = route_generator(origin, destination)
# save_routes_to_file(routes)
print('step 1')
lst = route_reader_for_index(routes)
print('step 2')
print(rerank(lst))
