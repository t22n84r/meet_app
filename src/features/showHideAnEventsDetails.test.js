import { render, act, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { loadFeature, defineFeature } from 'jest-cucumber';
import userEvent from '@testing-library/user-event';
import MeetApp from '../App';

jest.mock('recharts');

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

   test('An event element is collapsed by default', ({ given, when, then }) => {

      given('user is on the events list page and did not click on an event', async () => {
         
         await act(async () => {
            render(<MeetApp />);
         });
      });
      
      when('event list is displayed', () => {
         
         expect(screen.getByTestId('event-list')).toBeInTheDocument();
      });
      
      then('the event element is collapsed by default', () => {
         
         const accordionButtons = screen.getAllByRole('button');
         accordionButtons.forEach(button => {
            expect(button).toBeInTheDocument();
            expect(button).toHaveAttribute('aria-expanded', 'false');
            expect(button).toHaveClass('collapsed');
      });
      });
   });

   test('User can expand an event to see details', ({ given, when, then }) => {

      given('user is on the events list page and did not click on an event', async () => {
         
         await act(async () => {
            render(<MeetApp />);
         });
      });
      
      when('event list is displayed', () => {
         
         expect(screen.getByTestId('event-list')).toBeInTheDocument();
      });
      
      then('user can expand an event to see details', async () => {
         
         const user = userEvent.setup();

         const accordionButtons = screen.getAllByRole('button');
         await act (async () => {
            await user.click(accordionButtons[0]);
         });
         expect(accordionButtons[0]).toHaveAttribute('aria-expanded', 'true');
         expect(accordionButtons[0]).not.toHaveClass('collapsed');

         await waitFor(() => {
            const element = screen.getAllByText(/Description:/i);
            expect(element[0]).toBeInTheDocument();
            expect(element[0].closest('.accordion-collapse')).toHaveClass('show');
         });
      });
   });

   test('User can collapse an event to hide details', ({ given, when, then }) => {

      let accordionButtons;
      let user;
      
      given('when event details are displayed', async () => {
         
         await act(async () => {
            render(<MeetApp />);
         });

         user = userEvent.setup();

         accordionButtons = screen.getAllByRole('button');
         await act (async () => {
            await user.click(accordionButtons[0]);
         });
         expect(accordionButtons[0]).toHaveAttribute('aria-expanded', 'true');
         expect(accordionButtons[0]).not.toHaveClass('collapsed');

         await waitFor(() => {
            const element = screen.getAllByText(/Description:/i);
            expect(element[0]).toBeInTheDocument();
            expect(element[0].closest('.accordion-collapse')).toHaveClass('show');
         });
      });
      
      when('user clicks on an event element', async () => {
         
         await act (async () => {
            await user.click(accordionButtons[0]);
         });
      });
      
      then('user can collapse an event to hide details', () => {
         
         expect(accordionButtons[0]).toHaveAttribute('aria-expanded', 'false');
         expect(accordionButtons[0]).toHaveClass('collapsed');
      });
   });
});