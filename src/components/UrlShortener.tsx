import React from "react";
import UrlList from "./url-shorten-list";
import UrlShortenForm from "./url-shorten-form";

export default function UrlShortener() {
  return (
    <div>
      <UrlShortenForm />
      <UrlList/>
    </div>
  );
}
