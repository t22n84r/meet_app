import { render, screen } from '@testing-library/react';
import { act } from'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import { getEvents, extractLocations } from '../api';

describe('CitySearch component', () => {

   test('renders text input', () => {

      render(<CitySearch />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toHaveClass('city');
   });

   test('suggestions list is hidden by default', async() => {

      render(<CitySearch />);
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
   });

   test('renders a list of suggestions when city search text box gains focus', async() => {

      const user = userEvent.setup();
      render(<CitySearch />);
      user.click(screen.getByRole('textbox'));
      expect(await screen.findByRole('list')).toBeInTheDocument();
      expect(screen.getByRole('list')).toHaveClass('suggestions');
   });

   test('updates list of suggestions correctly when user types in city textbox', async() => {

      const user = userEvent.setup();
      const CitySearchComponent = render(<CitySearch />);
      const allEvents = await getEvents();
      const allLocations = extractLocations(allEvents);
      
      CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

      // user types "Berlin" in city textbox
      const cityTextBox = CitySearchComponent.getByRole('textbox');
      await act (async () => {
         await user.type(cityTextBox, 'Berlin');
      });


      // filter allLocations to locations matching "Berlin"
      const suggestions = allLocations ? allLocations.filter((location) => {

         return location.toUpperCase().includes(cityTextBox.value.toUpperCase());
      }) : [];

      // get all <li> elements inside the suggestion list
      const suggestionListItems = CitySearchComponent.getAllByRole('listitem');
      expect(suggestionListItems).toHaveLength(suggestions.length + 1);
      
      for (let i = 0; i < suggestionListItems.length - 1; i += 1) {
         expect(suggestionListItems[i].textContent.trim()).toBe(suggestions[i]);
      }
   });

   test('renders the suggestion text in the textbox upon clicking on the suggestion', async() => {

      const user = userEvent.setup();
      const CitySearchComponent = render(<CitySearch />);
      const allEvents = await getEvents();
      const allLocations = extractLocations(allEvents);
      
      CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

      // user types "Berlin" in city textbox
      const cityTextBox = CitySearchComponent.getByRole('textbox');
      await act (async () => {
         await user.type(cityTextBox, 'Berlin');
      });

      const BerlinGermanySuggestion = CitySearchComponent.getAllByRole('listitem')[0];
      await act (async () => {
         await user.click(BerlinGermanySuggestion);
      });

      expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
   });

   test('renders only "See all cities" when user query does not match any locations or allLocation is empty', async() => {

      const user = userEvent.setup();
      const CitySearchComponent = render(<CitySearch />);
      const allEvents = await getEvents();
      const allLocations = extractLocations(allEvents);
      
      // Test case where no locations match the query
      CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);
      let cityTextBox = CitySearchComponent.getByRole('textbox');
      await act (async () => {
         await user.clear(cityTextBox); // Clear the existing value
         await user.type(cityTextBox, 'NonExistentCity'); // Type a non-matching value
      });

      // We only expect the "See all cities" option to be available
      let suggestionListItemsForNoMatch = CitySearchComponent.queryAllByRole('listitem');
      expect(suggestionListItemsForNoMatch).toHaveLength(1);
      expect(suggestionListItemsForNoMatch[0].textContent).toBe('See all cities');

      // Test case where no locations match the query
      CitySearchComponent.rerender(<CitySearch allLocations={null} />);
      cityTextBox = CitySearchComponent.getByRole('textbox');
      await act (async () => {
         await user.clear(cityTextBox); // Clear the existing value
         await user.type(cityTextBox, 'NonExistentCity'); // Type a non-matching value
      });

      // We only expect the "See all cities" option to be available
      suggestionListItemsForNoMatch = CitySearchComponent.queryAllByRole('listitem');
      expect(suggestionListItemsForNoMatch).toHaveLength(1);
      expect(suggestionListItemsForNoMatch[0].textContent).toBe('See all cities');
   });
});