// src/components/BasicCollector.jsx
import { useState } from 'react';
import { useCollector } from '../hooks/useCollector';

export default function BasicCollector() {
  // Passando a chave 'coleta_simples_db' para o hook
  const { items, addItem, clearList, exportToJSON, totalDistinctItems, totalQuantity } = useCollector('coleta_simples_db');


  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!barcode) return;
    addItem({ barcode, quantity });
    setBarcode('');
    setQuantity(1);
    document.getElementById('basic-barcode').focus();
  };

  return (
    <div className="collector-container">
      <h2>Coleta Simples</h2>
      
      <form onSubmit={handleSubmit} className="collection-form">
        <div className="input-group">
          <label>Código de Barras</label>
          <input 
            id="basic-barcode"
            type="text" 
            value={barcode} 
            onChange={(e) => setBarcode(e.target.value)} 
            placeholder="Escaneie ou digite..."
            required 
            autoFocus
          />
        </div>
        <div className="input-group">
          <label>Quantidade</label>
          <input 
            type="number" 
            min="1"
            value={quantity} 
            onChange={(e) => setQuantity(Number(e.target.value))} 
            required 
          />
        </div>
        <button type="submit" className="btn-primary">Adicionar / Somar</button>
      </form>

      <div className="stats">
        <div className="stat-item">
          <span className="stat-value">{totalDistinctItems}</span>
          <span className="stat-label">SKUs Distintos</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{totalQuantity}</span>
          <span className="stat-label">Total de Peças</span>
        </div>
      </div>

      <div className="actions">
        <button onClick={() => exportToJSON('coleta_simples.json')} className="btn-secondary">Exportar JSON</button>
        <button onClick={clearList} className="btn-danger">Limpar Lista</button>
      </div>

      <ul className="item-list">
        {items.map((item, index) => (
          <li key={index}>
            <div className="item-info">
              <span className="item-barcode">{item.barcode}</span>
            </div>
            <div className="item-qty">
              {item.quantity}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}