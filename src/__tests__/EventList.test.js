import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import EventList from '../components/EventList';
import { getEvents } from '../api';
import MeetApp from '../App';

describe('<EventList /> component', () => {

   let EventListComponent;
   let allEvents;
   beforeEach(async () => {
      await act(async () => {
         allEvents = await getEvents();
         EventListComponent = render(<EventList events={allEvents}/>);
      });
   });   

   test('it renders null when no events are passed', () => {
      
      EventListComponent.rerender(<EventList events={null} />);
      
      const eventList = screen.queryByTestId('event-list');
      expect(eventList).not.toHaveTextContent();
   });

   test('has an element with "list" role', () => {

      expect(screen.getByRole('list')).toBeInTheDocument();
   });

   /*test('renders correct number of events', () => {

      expect(screen.getAllByRole('listitem')).toHaveLength(allEvents.length);
   });*/

   // feature 2 tests
   test('it contains a button with text that includes "Summary:"', () => {
      
      const accordionHeaders = screen.getAllByText(/Summary:/i);
      accordionHeaders.forEach(header => {
         expect(header).toBeInTheDocument();
         expect(header).toHaveTextContent('Summary:');
      });
   });

   // feature 2 tests
   test('it contains a button with with class collapsed', () => {

      const accordionButtons = screen.getAllByRole('button');
      accordionButtons.forEach(button => {
         expect(button).toBeInTheDocument();
         expect(button).toHaveAttribute('aria-expanded', 'false');
         expect(button).toHaveClass('collapsed');
      });
   });

   // feature 2 tests
   test('with a button click expands to show details of events', async () => {

      const user = userEvent.setup();

      const accordionButtons = screen.getAllByRole('button');
      await act (async () => {
         await user.click(accordionButtons[0]);
      });
      expect(accordionButtons[0]).toHaveAttribute('aria-expanded', 'true');
      expect(accordionButtons[0]).not.toHaveClass('collapsed');

      await waitFor(() => {
         const element = screen.getAllByText(/Starting time:/i);
         expect(element[0]).toBeInTheDocument();
         expect(element[0].parentElement).toHaveClass('accordion-collapse show');
      });

      await act (async () => {
         await user.click(accordionButtons[0]);
      });
      expect(accordionButtons[0]).toHaveAttribute('aria-expanded', 'false');
      expect(accordionButtons[0]).toHaveClass('collapsed');
   });

   // feature 3 tests
   test('renders 32 events by default', () => {

      expect(screen.getAllByRole('listitem')).toHaveLength(32);
      const inputElemByPlaceholder = screen.getByPlaceholderText('Events count to display...');
      expect(inputElemByPlaceholder).toBeInTheDocument();
      expect(inputElemByPlaceholder).toHaveValue(32);
   });

   // feature 3 tests
   test('renders number of events that user wants', async () => {

      const user = userEvent.setup();

      const inputElemByPlaceholder = screen.getByPlaceholderText('Events count to display...');
      await act(async () => {
         await user.clear(inputElemByPlaceholder);
         await user.type(inputElemByPlaceholder, '10');
         fireEvent.change(inputElemByPlaceholder);
      });

      expect(screen.getAllByRole('listitem')).toHaveLength(10);
   });
});

describe('<EventList /> integration', () => {

   test('renders a list of 32 events when the app is mounted and rendered', async () => {

      render(<MeetApp />);
      await waitFor(() => {
         expect(screen.getAllByRole('listitem')).toHaveLength(32);
      });
   });
});