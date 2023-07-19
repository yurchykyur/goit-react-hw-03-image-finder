import { Component } from 'react';
import { toast } from 'react-toastify';
import { FaSistrix } from 'react-icons/fa';

import {
  SearchbarSection,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export default class Searchbar extends Component {
  state = { searchQuery: '', prevSearchQuery: '' };

  handleInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value.toLowerCase().trim() });
  };

  reset = () => {
    this.setState({ searchQuery: '' });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { searchQuery } = this.state;
    if (!searchQuery) {
      toast.info('Please write search query.');
      return;
    }

    if (searchQuery === this.state.prevSearchQuery) {
      toast.info(
        `"${searchQuery}" search completed. Enter a different search query`
      );
      this.reset();
      return;
    }

    this.setState({ prevSearchQuery: searchQuery });
    this.props.formSubmitHandler(searchQuery);
    this.reset();
  };

  render() {
    return (
      <SearchbarSection>
        <SearchForm onSubmit={this.handleFormSubmit}>
          <SearchFormButton type="submit">
            <FaSistrix style={{ width: 20, height: 20 }} />
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            name="searchQuery"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
            value={this.state.searchQuery}
          />
        </SearchForm>
      </SearchbarSection>
    );
  }
}
