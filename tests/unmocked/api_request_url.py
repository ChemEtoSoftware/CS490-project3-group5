""" util function for unmocked test """
def api(keyword):
    """api search"""
    #to send query request to TicketMaster API
    redurl = 'https://app.ticketmaster.com/discovery/v2/events.json?'
    if keyword:
        redurl += "&keyword={}".format(keyword)
    return redurl
