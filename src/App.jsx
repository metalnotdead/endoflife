import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("alpine");
  const productOptions = [
    "alpine",
    "amazon-linux",
    "android",
    "bootstrap",
    "centos",
    "debian",
    "django",
    "dotnet",
    "dotnetcore",
    "dotnetfx",
    "drupal",
    "elasticsearch",
    "elixir",
    "fedora",
    "filemaker",
    "freebsd",
    "go",
    "godot",
    "iphone",
    "java",
    "kindle",
    "kubernetes",
    "laravel",
    "macos",
    "magento",
    "mariadb",
    "mongodb",
    "mssqlserver",
    "mysql",
    "nodejs",
    "office",
    "opensuse",
    "perl",
    "php",
    "pixel",
    "postgresql",
    "powershell",
    "python",
    "qt",
    "rabbitmq",
    "rails",
    "redis",
    "rhel",
    "ros",
    "ruby",
    "sles",
    "spring-framework",
    "surface",
    "symfony",
    "ubuntu",
    "vue",
    "wagtail",
    "windows",
    "windowsembedded",
    "windowsserver",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://endoflife.date/api/${selectedProduct}.json`
        );
        const jsonData = await response.json();

        setData(jsonData.slice(-5));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedProduct]);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;

    if (productOptions.includes(selectedValue)) {
      setSelectedProduct(selectedValue);
    }
  };

  return (
    <div>
      <label htmlFor="productSelect">Select a product:</label>
      <select
        id="productSelect"
        value={selectedProduct}
        onChange={handleSelectChange}
      >
        {productOptions.map((product) => (
          <option key={product} value={product}>
            {product}
          </option>
        ))}
      </select>
      <h1>Data Table</h1>
      <table-container>
        <table>
          <thead>
            <tr>
              <th>Cycle</th>
              <th>Release Date</th>
              <th>EOL</th>
              <th>Latest</th>
              <th>Latest Release Date</th>
              <th>Link</th>
              <th>LTS</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) &&
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.cycle}</td>
                  <td>{item.releaseDate}</td>
                  <td>{item.eol}</td>
                  <td>{item.latest}</td>
                  <td>{item.latestReleaseDate}</td>
                  <td>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.link}
                    </a>
                  </td>
                  <td>{item.lts ? "Yes" : "No"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </table-container>
    </div>
  );
};

export default App;
