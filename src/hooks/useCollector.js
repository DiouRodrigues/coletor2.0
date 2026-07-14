// src/hooks/useCollector.js
import { useState, useEffect } from 'react';
import { get, set } from 'idb-keyval';

// Agora o hook recebe o nome do banco/chave como parâmetro
export function useCollector(collectionKey) {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Usa a chave específica da tela para buscar os dados
        const savedItems = await get(collectionKey);
        if (savedItems) {
          setItems(savedItems);
        }
      } catch (error) {
        console.error(`Erro ao buscar dados de ${collectionKey}:`, error);
      } finally {
        setIsLoaded(true);
      }
    };
    
    loadData();
  }, [collectionKey]); // Reexecuta se a chave mudar

  useEffect(() => {
    if (isLoaded) {
      // Salva na chave específica da tela
      set(collectionKey, items).catch(error => 
        console.error(`Erro ao salvar em ${collectionKey}:`, error)
      );
    }
  }, [items, isLoaded, collectionKey]);

  const addItem = (newItem) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(item => item.barcode === newItem.barcode);
      
      if (existingIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingIndex].quantity += Number(newItem.quantity);
        
        if (newItem.extraSelect) updatedItems[existingIndex].extraSelect = newItem.extraSelect;
        if (newItem.extraEdit) updatedItems[existingIndex].extraEdit = newItem.extraEdit;
        
        return updatedItems;
      }
      
      return [...prevItems, { ...newItem, quantity: Number(newItem.quantity) }];
    });
  };

  const     clearList = () => {
  
      setItems([]);
    
  };

  const exportToJSON = (filename = 'coleta.json') => {
    if (items.length === 0) {
      return;
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(items, null, 2));
    const downloadElement = document.createElement('a');
    downloadElement.setAttribute("href", dataStr);
    downloadElement.setAttribute("download", filename);
    document.body.appendChild(downloadElement);
    downloadElement.click();
    downloadElement.remove();
  };

  const totalDistinctItems = items.length;
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  return { 
    items, 
    addItem, 
    clearList, 
    exportToJSON, 
    totalDistinctItems, 
    totalQuantity,
    isLoaded 
  };
}