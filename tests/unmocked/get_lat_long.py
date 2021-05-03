""" util function for unmocked test """
from geopy.geocoders import Nominatim
from uszipcode import SearchEngine
def get_lat_long(location_json):
    """ get user location """
    latitude = location_json[0]
    longitude = location_json[1]
    geolocator = Nominatim(user_agent="EventGuru")
    coordinates = "" + str(latitude) + " " + str(longitude)
    location = geolocator.reverse(coordinates)
    location_list = location.address.split(", ")
    zip_code = location_list[-2]
    searchengine = SearchEngine(simple_zipcode=True)
    zipcode = searchengine.by_zipcode(zip_code)
    zipcode_dict = zipcode.to_dict()
    return zipcode_dict["state"]
