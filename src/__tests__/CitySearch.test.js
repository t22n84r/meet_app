import { render, screen, within } from '@testing-library/react';
import { act } from'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import { getEvents, extractLocations } from '../api';
import MeetApp from '../App';

describe('<CitySearch /> component', () => {

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
      render(<CitySearch allLocations={[]}/>);
      user.click(screen.getByRole('textbox'));
      expect(await screen.findByRole('list')).toBeInTheDocument();
      expect(screen.getByRole('list')).toHaveClass('suggestions');
   });

   test('updates list of suggestions correctly when user types in city textbox', async() => {

      const user = userEvent.setup();
      const CitySearchComponent = render(<CitySearch />);
      const allEvents = await getEvents();
      const allLocations = extractLocations(allEvents);
      
      CitySearchComponent.rerender(<CitySearch allLocations={allLocations} setCurrentCity={() => { }} setInfoAlert={() => { }} />);

      // user types "Berlin" in city textbox
      const cityTextBox = CitySearchComponent.getByRole('textbox');
      await act (async () => {
         await user.type(cityTextBox, 'Berlin');
      });


      // filter allLocations to locations matching "Berlin"
      const suggestions = allLocations ? allLocations.filter((location) => { return location.toUpperCase().includes(cityTextBox.value.toUpperCase())}) : [];

      // get all <li> elements inside the suggestion list
      const searchResults = screen.getByTestId('city-search-suggestionList');
      const suggestionListItems = within(searchResults).getAllByRole('listitem');

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
      
      CitySearchComponent.rerender(<CitySearch allLocations={allLocations} setCurrentCity={() => { }} setInfoAlert={() => { }} />);

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
});

describe('<CitySearch /> integration', () => {

   test('renders suggestions list when the app is rendered.', async () => {
      const user = userEvent.setup();
      const view = render(<MeetApp />);

      // target the portion of the app that is rendered from CitySearch.js with "city-search" & "within"
      const CitySearchDOM = view.getByTestId('city-search');                  
      const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
      await act (async () => {
         await user.click(cityTextBox);
      });
  
      const allEvents = await getEvents();
      const allLocations = extractLocations(allEvents);
  
      const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
      expect(suggestionListItems.length).toBe(allLocations.length + 1);
   });
});