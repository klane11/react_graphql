import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/client/testing';

import { Search } from '.';
import { ClearResults, SearchBar } from './styles';
import { Button } from '../../../common/button';

describe('Search Bar', () => {
  const mockSearch = jest.fn();
  const mockClear = jest.fn();
  const mountComponent = () =>
    mount(
      <MockedProvider>
        <Search handleClearSearch={mockClear} handleSearch={mockSearch} />
      </MockedProvider>
    );

  it('should render', () => {
    const wrapper = mountComponent();
    expect(wrapper.find(Search).exists()).toBe(true);
  });

  it('should show "Clear" option', () => {
    const wrapper = mountComponent();

    expect(wrapper.find(ClearResults).exists()).toBe(false);
    wrapper.find(SearchBar).simulate('change', { target: { value: 'Search term' } });
    wrapper.update();

    expect(wrapper.find(ClearResults).exists()).toBe(true);
    wrapper.find(ClearResults).simulate('click');

    expect(mockClear).toHaveBeenCalled();
  });

  it('should fire search', () => {
    const wrapper = mountComponent();
    const searchTerm = 'Firstname';

    // button should be disabled until search has a value
    expect(wrapper.find(Button).prop('disabled')).toBe(true);
    wrapper.find(SearchBar).simulate('change', { target: { value: searchTerm } });
    wrapper.update();

    expect(wrapper.find(Button).prop('disabled')).toBe(false);
    wrapper.find(Button).simulate('click');

    expect(mockSearch).toHaveBeenCalledWith(searchTerm);
  });
});
