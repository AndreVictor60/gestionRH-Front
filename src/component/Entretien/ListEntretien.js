import React, { Component } from "react";
import EntretienService from "../../services/entretien.service";
import salariesService from "src/services/salaries.service";
import moment from 'moment';
import momentFR from 'moment/locale/fr';
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { AsyncPaginate } from "react-select-async-paginate";

class ListEntretien extends Component {
  constructor(props) {
    super(props);
    this.retrieveEntretien = this.retrieveEntretien.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.loadSalarie = this.loadSalarie.bind(this);
    this.loadSalarieManager = this.loadSalarieManager.bind(this);
    this.onChangeInputSalarie = this.onChangeInputSalarie.bind(this);
    this.onChangeInputSalarieManager = this.onChangeInputSalarieManager.bind(this);
    this.onChangeSalarie = this.onChangeSalarie.bind(this);
    this.onChangeManagerEntretien = this.onChangeManagerEntretien.bind(this);
    this.state = {
      nomSalarie: "",
      nomManager: "",
      entretiens: [],
      salaries: {},
      managers: {},
      itemsPerPage: 5,
      currentPage: 0,
      pageCount: 0,
      searchExpression: ""
    };
    moment.locale('fr', momentFR);
  }

  componentDidMount() {
    this.retrieveEntretien();
  }
  onChangeSalarie(e) {
    this.setState({ salaries: e });
  }

  onChangeManagerEntretien(e) {
    this.setState({ managers: e });
  }

  retrieveEntretien() {
    EntretienService.count(this.state.salaries === null ? undefined : this.state.salaries.id, this.state.managers === null ? undefined : this.state.managers.id).then((resp) => {
      let nbPage = Math.ceil(resp.data / this.state.itemsPerPage)
      this.setState({ pageCount: nbPage })
    }).catch((e) => { console.log(e) });
    EntretienService.getAllEntretiensByPage(this.state.currentPage, this.state.itemsPerPage, this.state.salaries === null ? undefined : this.state.salaries.id, this.state.managers === null ? undefined : this.state.managers.id)
      .then(response => {
        this.setState({
          entretiens: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  handlePageClick = (data) => {
    let selected = data.selected;
    this.setState({ currentPage: selected }, () => {
      this.retrieveEntretien();
    });
  };

  onChangeInputSalarie(e) {
    this.setState({ nomSalarie: e }, () => { this.retrieveEntretien() })
  }

  onChangeInputSalarieManager(e) {
    this.setState({ nomManager: e }, () => { this.retrieveEntretien() })
  }

  async loadSalarie(search, prevOptions, { page }, e) {
    const response = await salariesService.getAllSalariesByKeywordPerPage(page, 10, this.state.nomSalarie);
    const responseJSON = await response.data;
    return {
      options: responseJSON,
      hasMore: responseJSON.length >= 1,
      additional: {
        page: search ? 2 : page + 1,
      }
    };
  };

  async loadSalarieManager(search, prevOptions, { page }, e) {
    const response = await salariesService.getAllSalariesByKeywordPerPage(page, 10, this.state.nomManager);
    const responseJSON = await response.data;
    return {
      options: responseJSON,
      hasMore: responseJSON.length >= 1,
      additional: {
        page: search ? 2 : page + 1,
      }
    };
  };

  render() {
    const { entretiens, salaries, managers } = this.state;
    return (
      <><div className="form-row justify-content-between mt-4">
        <div className="col-md-6">
          <label class="font-weight-bold" htmlFor="salarie">Salarie :</label>
          <AsyncPaginate
            name="salarie"
            value={salaries !== null ? Object.entries(salaries).length === 0 ? null : salaries : null}
            loadOptions={this.loadSalarie}
            isClearable
            getOptionValue={(option) => option.id}
            getOptionLabel={(option) => option.prenom + ' ' + option.nom}
            onChange={this.onChangeSalarie}
            isSearchable={true}
            onInputChange={this.onChangeInputSalarie}
            placeholder="Selectionner un salarie"
            additional={{
              page: 0,
            }}
          />
        </div>
        <div className="col-md-6 ">
          <label class="font-weight-bold" htmlFor="manager">Manager :</label>
          <AsyncPaginate
            name="manager"
            isClearable
            value={managers !== null ? Object.entries(managers).length === 0 ? null : managers : null}
            loadOptions={this.loadSalarieManager}
            getOptionValue={(option) => option.id}
            getOptionLabel={(option) => option.prenom + ' ' + option.nom}
            onChange={this.onChangeManagerEntretien}
            isSearchable={true}
            onInputChange={this.onChangeInputSalarieManager}
            placeholder="Selectionner un manager"
            additional={{
              page: 0,
            }}
          />
        </div>
      </div>
        <div className="row mt-4">
          <div className="col-lg-12">
            <table className="table table-hover table-striped table-bordered ">
              <thead>
                <tr>
                  <th>Numéro</th>
                  <th>Date / heure</th>
                  <th>Compte rendu</th>
                  <th>Salarie (Prenom-Nom)</th>
                  <th>Manager  (Prenom-Nom)</th>
                  <th></th>
                </tr>
              </thead>
              {entretiens.length > 0 ? (
                <tbody>
                  {entretiens.map(entretien =>
                  <tr key={entretien.id}>
                    <td>{entretien.id}</td>
                    <td>{moment(entretien.dateEntretien).format("llll")}</td>
                    <td>{entretien.compteRendu === null ? "Aucun" : entretien.compteRendu.compteRendu}</td>
                    <td>{` ${entretien.salarie.prenom} ${entretien.salarie.nom}`}</td>
                    <td>{`${entretien.managerEntretien.prenom} ${entretien.managerEntretien.nom}`}</td>
                    <td><Link to={"/entretiens/modification/" + entretien.id}>Modifier</Link></td>
                  </tr>
                  )}
                </tbody>
                ):(
                  <tbody>
                    <td colspan="6" className="text-center font-weight-bold" >Aucun entretien</td>
                  </tbody>
                )}
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
    );

  }
}

export default ListEntretien;