Feature: Specify Number of Events

   Scenario: When user has not specified a number, 32 events are shown by default
      Given user is on the events list page 
      When number of events to be displayed is not specified by user
      Then 32 events are shown by default

   Scenario: User can change the number of events displayed
      Given user is on the events list page 
      When the user chooses to specify the number of events to display
      Then user can change the number of events displayed