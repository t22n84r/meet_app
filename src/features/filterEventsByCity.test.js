import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, screen, waitFor, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import MeetApp from '../App';

jest.mock('recharts');

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {

   test('When user hasn’t searched for a city, show upcoming events from all cities', ({ given, when, then }) => {

      given('user hasn’t searched for any city', () => {

      });

      when('the user opens the app', async() => {

         await act(async () => {
            render(<MeetApp />);
         });
      });

      then('the user should see the list of all upcoming events', async () => {

         const EventListDOM = screen.getByTestId('event-list');

         await waitFor(() => {
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            expect(EventListItems.length).toBe(32);
         });
      });
   });

   test('User should see a list of suggestions when they search for a city', ({ given, when, then }) => {

      given('the main page is open', async() => {

         await act(async () => {
            render(<MeetApp />);
         });
      });

      let CitySearchDOM;
      when('user starts typing in the city textbox', async() => {

         const user = userEvent.setup();
   
         CitySearchDOM = screen.getByTestId('city-search');
         const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');
         
         await act(async () => {
            await user.type(CitySearchInput, "Berlin");
         });
      });

      then('the user should receive a list of cities (suggestions) that match what they have typed', () => {

         const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem'); 
         expect(suggestionListItems).toHaveLength(2);
      });
   });

   test('user can select a city from the suggested list', ({ given, and, when, then }) => {

      let CitySearchDOM;
      let CitySearchInput;
      given('user was typing “Berlin” in the city textbox', async () => {

         await act(async () => {
            render(<MeetApp />);
         });

         const user = userEvent.setup();

         CitySearchDOM = screen.getByTestId('city-search');
         CitySearchInput = within(CitySearchDOM).getByRole('textbox');
         await act(async () => {
            await user.type(CitySearchInput, "Berlin");
         });
      });

      let suggestionListItems;
      and('the list of suggested cities is showing', () => {

         suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem'); 
         expect(suggestionListItems).toHaveLength(2);
      });

      when('the user selects a city (e.g., “Berlin, Germany”) from the list', async () => {

         const user = userEvent.setup();
         await act(async () => {
            await user.click(suggestionListItems[0]);
         });
      });

      then('their city should be changed to that city (i.e., “Berlin, Germany”)', () => {

         expect(CitySearchInput.value.trim()).toBe('Berlin, Germany');
      });

      and('the user should receive a list of upcoming events in that city', async () => {

         const EventListDOM = screen.getByTestId('event-list');
         const EventListItems = within(EventListDOM).getAllByRole('listitem');
         const allEvents = await getEvents();

         // filtering the list of all events down to events located in Germany
         // citySearchInput.value should have the value "Berlin, Germany" at this point
         const berlinEvents = allEvents.filter(event => event.location === CitySearchInput.value.trim());
         expect(EventListItems).toHaveLength(berlinEvents.length);
      });
   });
});