const { useState, useEffect } = React;

function App() {
  const [banks, setBanks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://bank.thecloudalert.com/api/get/?keyword=" + search)
      .then(res => res.json())
      .then(data => {
        if (data.status === 200 && Array.isArray(data.data)) {
          const formatted = data.data.map(item => ({
            id: item[0],
            type: item[1],
            code: item[2],
            name: item[3],
            address: item[4],
            phone: item[5],
            fax: item[6],
            website: item[7]
          }));
          setBanks(formatted);
        }
      });
  }, [search]);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Katalog Bank Indonesia</h1>
      <input
        type="text"
        placeholder="Cari nama bank..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid">
        {banks.map((bank, index) => (
          <div className="card" key={index}>
            <h3>{bank.name}</h3>
            <p><strong>Tipe:</strong> {bank.type}</p>
            <p><strong>Kode:</strong> {bank.code}</p>
            <p><strong>Alamat:</strong> {bank.address}</p>
            <p><strong>Telepon:</strong> {bank.phone}</p>
            <p><strong>Fax:</strong> {bank.fax}</p>
            <p>
              <a href={`https://${bank.website}`} target="_blank" rel="noopener noreferrer">
                {bank.website}
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
