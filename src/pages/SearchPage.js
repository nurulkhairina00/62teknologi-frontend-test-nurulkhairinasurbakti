import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Container } from "react-bootstrap";
import { API_URL } from "../utils/constants";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "../component/SearchBar";
import SearchResults from "../component/SearchResults";
// import Header from "../component/Header";

export default function SearchPage() {
  let [results, setResults] = useState([]); // State hasil search
  let [searchTerm, setSearchTerm] = useState(""); // State term
  let [searchLocation, setSearchLocation] = useState(""); // State location
  let [selectedPrices, setSelectedPrices] = useState([]); // State price

  const searchBusiness = ({ term, location, selectedPrices }) => {
    setSearchTerm(term);
    setSearchLocation(location);

    let priceParam = "";
    if (selectedPrices) {
      if (selectedPrices.length > 0) {
        priceParam = selectedPrices
          .map((price, index) => (index === 0 ? price : `${price}`))
          .join(",");
      }
    }

    // Query params
    const queryParams = {
      term,
      location,
    };

    // Add params price jika ada
    if (priceParam) {
      queryParams.price = priceParam;
    }

    // Get data search
    axios
      .get(API_URL + `/v3/business/search`, {
        params: queryParams,
      })
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          Swal.fire({
            icon: "info",
            title: "Oops...",
            text: error.response.data.message,
            confirmButtonColor: "#ebcf70",
            width: 300,
          });
        } else {
          console.error(error);
        }
      });
  };

  // Onchnge jika melakukank filter
  const handlePriceChange = (selected) => {
    setSelectedPrices(selected);
    searchBusiness({
      term: searchTerm,
      location: searchLocation,
      selectedPrices: selected,
    });
  };

  return (
    <>
      <Container>
        <SearchBar onSearch={searchBusiness} />
        <SearchResults
          results={results}
          term={searchTerm}
          location={searchLocation}
          selectedPrices={selectedPrices}
          onPriceFilterChange={handlePriceChange}
        />
      </Container>
    </>
  );
}
