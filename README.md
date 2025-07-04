# Booking 2025

**Commons Hub Brussels**

This is the repository to track applications and solutions relevant to internal and external
booking systems of the CHB.

## Booking system modules
* Web front end to enter structured booking request data
  * [Booking System Frontend Repository](https://github.com/CommonsHub/bookingsystem-frontend)
  * includes request entry, request status flow, confirmation
  * it is hosted on netlify
* Database as source of truth
  * Using supabase 
  * See https://github.com/CommonsHub/bookingsystem/issues/4
* Automation between database and google calendar
  * Some tries done with n8n
  * [Booking System Dabase Trigger](https://github.com/CommonsHub/bookingsystem-dbtrigger)
* Email integration
  * Supabase DB triggers a Supabase Function that sends email on new booking requests and event confirmations. See [Booking System Dabase Trigger](https://github.com/CommonsHub/bookingsystem-dbtrigger).

## Future modules
* Discord bot to make a booking
* Nostr relay as public distributed database
* Knowledge base about booking the Commons Hub
  * make knowledge accessible
* Google Calendar
  * One calendar per room
