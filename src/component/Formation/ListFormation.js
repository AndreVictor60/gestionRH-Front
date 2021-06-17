import React, { Component } from 'react'
import { CButton, CSelect } from "@coreui/react";
import { Link } from 'react-router-dom';
import FormationService from '../../services/formations.service';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import DatePicker, { registerLocale } from 'react-datepicker';
import getDay from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import fr from "date-fns/locale/fr";
registerLocale("fr", fr);

class ListFormation extends Component {

  constructor(props) {
    super(props);
    this.retrieveFormation = this.retrieveFormation.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeLastDate = this.onChangeLastDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.searchFormation = this.searchFormation.bind(this);
    this.state = {
      startDate: new Date(),
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      formations: [],
      itemsPerPage: 5,
      currentPage: 0,
      pageCount: 0,
      searchExpression: ""
    }
  }
  isWeekday = (date) => {
    const day = getDay(date)
    return day !== 0 && day !== 6
  }
  componentDidMount() {
    this.retrieveFormation();
  }

  retrieveFormation() {
    FormationService.countFormation(this.state.searchExpression,this.state.startDate, this.state.endDate).then((resp) => {
      let nbPage = Math.ceil(resp.data / this.state.itemsPerPage)
      this.setState({ pageCount: nbPage })
      console.log(resp.data)
    }).catch((e) => { console.log(e.message) });
    FormationService.getFormationPeriodByPage(this.state.currentPage, this.state.itemsPerPage,this.state.searchExpression, this.state.startDate, this.state.endDate)
      .then(response => {
        this.setState({
          formations: response.data
        })
        console.log(response.data)
      })
      .catch(e => {
        console.log(e.message);
      });
  }

  handlePageClick = (data) => {
    let selected = data.selected;
    this.setState({ currentPage: selected }, () => {
      this.retrieveFormation();
    });
  };

  searchFormation(e) {
    e.preventDefault();
    this.setState({ currentPage: 0 },() => {this.retrieveFormation();});
  }

  onChangeStartDate(e) {
    this.setState({ startDate: new Date(e) }, () => { this.retrieveFormation() })
  }

  onChangeLastDate(e) {
    this.setState({ endDate: new Date(e) }, () => { this.retrieveFormation() })
  }

  handleChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    if (name === "searchExpression") {
      this.setState({searchExpression: value}) 
    }
    if( name === "nbPage"){
      this.setState({itemsPerPage: value}, () => {this.retrieveFormation();}) 
    }
  }

  render() {
    const { formations, startDate, endDate } = this.state;
    return (
      <>
        <div className="form-row justify-content-between mt-4">
          <form name="searchEmployee" onSubmit={this.searchFormation} className="col-md-8">
            <div className="input-group mb-2">
              <input type="text" id="search-expression"
                name="searchExpression" placeholder="Saisir votre recherche.." onChange={this.handleChange} className="form-control" />
              <span className="input-group-prepend">
                <CButton type="submit" block color="info">
                  Recherche
                </CButton>
              </span>
            </div>
          </form>
          <form name="nbPageForm" className="col-md-2 ">
            <CSelect
              custom
              name="nbPage"
              id="nbPage"
              onChange={this.handleChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </CSelect>
          </form>
        </div>
        <div className="form-row">
          <div className="mt-2">
            <p class="font-weight-bold">Trier par date </p>
          </div>
          <div className="col-md-2">
            <DatePicker
              className="form-control"
              name="startDate"
              dateFormat="dd/MM/yyyy"
              selected={startDate}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              onChange={this.onChangeStartDate}
              showYearDropdown
              dateFormatCalendar="MMMM"
              yearDropdownItemNumber={5}
              scrollableYearDropdown
              todayButton="Aujourd'hui"
              placeholderText="Sélectionner une date"
              locale="fr"
              filterDate={this.isWeekday}
            />
          </div>
          <div className="col-md-2">
            <DatePicker
              className="form-control"
              name="lastDate"
              dateFormat="dd/MM/yyyy"
              selected={endDate}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              onChange={this.onChangeLastDate}
              showYearDropdown
              dateFormatCalendar="MMMM"
              yearDropdownItemNumber={5}
              scrollableYearDropdown
              todayButton="Aujourd'hui"
              placeholderText="Date de fin"
              locale="fr"
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-lg-12">
            <table className="table table-hover table-striped table-bordered">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Date de début</th>
                  <th>Date de fin</th>
                  <th>Durée<span><small><i>(en heure)</i></small></span></th>
                  <th>Prix<span><small><i>(TTC)</i></small></span></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {formations.map(formation =>
                  <tr key={formation.id}>
                    <td>{formation.titre}</td>
                    <td>{moment(formation.dateDebut).format('DD/MM/YYYY')}</td>
                    <td>{moment(formation.dateFin).format('DD/MM/YYYY')}</td>
                    <td>{formation.duree}</td>
                    <td>{formation.prix} €</td>
                    <td><Link to={"/formations/voir/" + formation.id}>Voir</Link></td>
                    <td><Link to={"/formations/modification/" + formation.id}>Modifier</Link></td>
                  </tr>
                )}
              </tbody>
            </table>
            <ReactPaginate
              previousLabel={'Précédent'}
              nextLabel={'Suivant'}
              breakLabel={'...'}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={4}
              onPageChange={this.handlePageClick}
              containerClassName="pagination"
              activeClassName="active"
              pageLinkClassName="page-link"
              breakLinkClassName="page-link"
              nextLinkClassName="page-link"
              previousLinkClassName="page-link"
              pageClassName="page-item"
              breakClassName="page-item"
              nextClassName="page-item"
              previousClassName="page-item"
              forcePage={this.state.currentPage}
            />
          </div>
        </div>
      </>
    )
  }
}

export default ListFormation
