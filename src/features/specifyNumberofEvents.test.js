import { render, act, screen, waitFor, fireEvent } from '@testing-library/react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import userEvent from '@testing-library/user-event';
import MeetApp from '../App';

jest.mock('recharts');

const feature = loadFeature('./src/features/specifyNumberofEvents.feature');

defineFeature(feature, test => {

   test('When user has not specified a number, 32 events are shown by default', ({ given, when, then }) => {

      given('user is on the events list page', async () => {
         
         await act(async () => {
            render(<MeetApp />);
         });

         expect(screen.getByTestId('event-list')).toBeInTheDocument();
      });
      
      when('number of events to be displayed is not specified by user', () => {
         
      });
      
      then('32 events are shown by default', () => {
         
         expect(screen.getAllByRole('listitem')).toHaveLength(32);
         const inputElemByPlaceholder = screen.getByPlaceholderText('Events count to display...');
         expect(inputElemByPlaceholder).toBeInTheDocument();
         expect(inputElemByPlaceholder).toHaveValue(32);
      });
   });

   test('User can change the number of events displayed', ({ given, when, then }) => {

      given('user is on the events list page', async () => {
         
         await act(async () => {
            render(<MeetApp />);
         });

         expect(screen.getByTestId('event-list')).toBeInTheDocument();
      });
      
      let inputElemByPlaceholder;
      when('the user chooses to specify the number of events to display', async () => {
         
         const user = userEvent.setup();

         inputElemByPlaceholder = screen.getByPlaceholderText('Events count to display...');
         await act(async () => {
            await user.clear(inputElemByPlaceholder);
            await user.type(inputElemByPlaceholder, '10');
         });
      });
      
      then('user can change the number of events displayed', () => {

         fireEvent.change(inputElemByPlaceholder);
   
         expect(screen.getAllByRole('listitem')).toHaveLength(10);
      });
   });
});