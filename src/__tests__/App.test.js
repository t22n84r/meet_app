import { render, screen, within, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import MeetApp from '../App';
import { getEvents } from '../api';

jest.mock('recharts');

describe('<MeetApp /> component', () => {

   beforeEach(async () => {
      await act(async () => {
         render(<MeetApp />);
      });
   });

   test('renders list of events', () => {
      expect(screen.getByTestId('event-list')).toBeInTheDocument();
   });

   test('renders City search', () => {
      expect(screen.getByTestId('city-search')).toBeInTheDocument();
   });
});

describe('<App /> integration', () => {

   test('renders a list of events matching the city selected by the user', async () => {
      const user = userEvent.setup();
      render(<MeetApp />);
  
      const CitySearchDOM = screen.getByTestId('city-search');
      const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');
      
      await act(async () => {
         await user.type(CitySearchInput, "Berlin");
      });
      const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
      await act(async () => {
         await user.click(berlinSuggestionItem);
      });
  
      const EventListDOM = screen.getByTestId('event-list');
      const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');   
      
      let allEvents = [];
      await act(async () => {
         allEvents = await getEvents();
      });
      const berlinEvents = allEvents.filter(
        event => event.location === 'Berlin, Germany'
      );
  
      expect(allRenderedEventItems.length).toBe(berlinEvents.length);
   });

   // feature 3 tests
   test('renders 32 events by default', async() => {

      render(<MeetApp />);
      await waitFor(() => {
         expect(screen.getAllByRole('listitem')).toHaveLength(32);
      });

      const inputElemByPlaceholder = screen.getByPlaceholderText('Events count to display...');
      expect(inputElemByPlaceholder).toBeInTheDocument();
      expect(inputElemByPlaceholder).toHaveValue(32);
   });

   // feature 3 tests
   test('renders number of events that user wants', async () => {

      const user = userEvent.setup();
      render(<MeetApp />);

      const inputElemByPlaceholder = screen.getByPlaceholderText('Events count to display...');
      await act(async () => {
         await user.clear(inputElemByPlaceholder);
         await user.type(inputElemByPlaceholder, '10');
         fireEvent.change(inputElemByPlaceholder);
      });

      expect(screen.getAllByRole('listitem')).toHaveLength(10);
   });
});