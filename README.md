# JARVIS (WIP)

My take on Ironman's JARVIS. Self-explanatory, JARVIS is an experimental virtual assistant, kinda like Siri for your computer. The aim is to have it handle anything you type/say to it and be able to order pizza, call an Uber, set an alarm on your phone etc.

# How it works
JARVIS is made with a core AI and other modular services each with their own AI, so that you will be able to use it for any service implemented. For example, inputting `'Remind me to do laundry tomorrow at 5pm` will cause the core AI to resolve an **intent**, being  `intent_reminder`, which causes it to delegate the received input to the registered AI which parses the input and handles adding reminders and events to Google Calendar, for instance.

As of now [Wit.ai](https://wit.ai/) is being used as the NLP module for each service to parse the input plaintext into intents and entities. Unfortunately making two round trips to Wit.ai instances in addition to the processing time in Wit.ai proves to take quite a while. 

# What it can do
[x] Add stuff to google calendar
[] Call an Uber
[] Order pizza
[] Set alarm on phone
[] Anything

# Usage
`npm start`

# Development
`npm run dev`
