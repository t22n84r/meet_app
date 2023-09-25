Feature: Show/Hide Event Details

   Scenario: An event element is collapsed by default
      Given user is on the events list page and did not click on an event
      When event list is displayed
      Then the event element is collapsed by default

   Scenario: User can expand an event to see details
      Given user is on the events list page and did not click on an event
      When event list is displayed
      Then user can expand an event to see details

   Scenario: User can collapse an event to hide details
      Given when event details are displayed
      When user clicks on an event element
      Then user can collapse an event to hide details