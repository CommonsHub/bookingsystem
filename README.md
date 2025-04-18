# Booking 2025

**Commons Hub Brussels**

This is the repository to track applications and solutions relevant to internal and external
booking systems of the CHB.



## Booking system modules
* Web front end to enter structured booking request data
  * [Booking System Frontend Repository](https://github.com/CommonsHub/bookingsystem-frontend)
  * includes request entry, request status flow, confirmation
* Database as source of truth
  * Using supabase 
  * See https://github.com/CommonsHub/bookingsystem/issues/4
* Google Calendar
  * One calendar per room
* Automation between database and google calendar
  * Some tries done with n8n
* Knowledge base about booking the Commons Hub
  * make knowledge accessible 
* Discord bot to make a booking
* Email integration
* Nostr relay as public distributed database
