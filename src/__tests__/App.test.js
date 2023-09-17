import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import MeetApp from '../App';

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