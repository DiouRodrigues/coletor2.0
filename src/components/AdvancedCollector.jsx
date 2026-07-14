import { useState } from 'react';
import { useCollector } from '../hooks/useCollector';

export default function AdvancedCollector() {
  // Passando a chave 'coleta_avancada_db' para o hook
  const { items, addItem, clearList, exportToJSON, totalDistinctItems, totalQuantity } = useCollector('coleta_avancada_db');
  
  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [extraSelect, setExtraSelect] = useState('Normal');
  const [extraEdit, setExtraEdit] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!barcode) return;
    addItem({ barcode, quantity, extraSelect, extraEdit });
    setBarcode('');
    setQuantity(1);
    setExtraEdit('');
    document.getElementById('advanced-barcode').focus();
  };

  return (
    <div className="collector-container">
      <h2>Coleta Avançada</h2>
      
      <form onSubmit={handleSubmit} className="collection-form">
        <div className="input-group">
          <label>Código de Barras</label>
          <input 
            id="advanced-barcode"
            type="text" 
            value={barcode} 
            onChange={(e) => setBarcode(e.target.value)} 
            placeholder="Escaneie ou digite..."
            required 
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
        <div className="input-group">
          <label>Situação do Produto</label>
          <select value={extraSelect} onChange={(e) => setExtraSelect(e.target.value)}>
            <option value="Normal">Estoque Normal</option>
            <option value="Avaria">Avaria / Defeito</option>
            <option value="Promoção">Ponta de Gôndola / Promoção</option>
          </select>
        </div>
        <div className="input-group">
          <label>Observação (Lote, Validade, etc.)</label>
          <input 
            type="text" 
            value={extraEdit} 
            onChange={(e) => setExtraEdit(e.target.value)} 
            placeholder="Ex: Lote 123A"
          />
        </div>
        <button type="submit" className="btn-primary">Registrar Coleta</button>
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
        <button onClick={() => exportToJSON('coleta_avancada.json')} className="btn-secondary">Exportar JSON</button>
        <button onClick={clearList} className="btn-danger">Limpar Lista</button>
      </div>

      <ul className="item-list">
        {items.map((item, index) => (
          <li key={index}>
            <div className="item-info">
              <span className="item-barcode">{item.barcode}</span>
              <span className="item-details">
                {item.extraSelect} {item.extraEdit && `• ${item.extraEdit}`}
              </span>
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