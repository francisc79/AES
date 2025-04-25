
 
    /**
     * Writes an Item into Storage
     * @param {*} key 
     * @param {*} value 
     */
    export const setDb = (key, value) => {
    //  set(key, value) {
      localStorage.setItem(key, JSON.stringify(value, undefined, 2));
    }
  
    /**
     * Get from LocalStorage
     * @param {*} key 
     */
    export const getDb = (key) => {
    //  get(key) {
      return JSON.parse(localStorage.getItem(key));
    }
  
    /**
     * Searches an Item by ID in given Storage
     * @param {*} key 
     * @param {*} id 
     */
    export const find = (key, id) => {
    //  find(key, id) {
      let storage = this.getDb(key);
      if (Array.isArray(storage)) {
        for (let item of storage) {
          return (item.id === id) ? item : null;
        }
      }
    }
    /**
     * Finds an Entry in Storage and updates it with given updatedItem
     * @param {*} key 
     * @param {*} id 
     * @param {*} updatedItem 
     */
    export const update = (key, id, updatedItem) => {
    //  update(key, id, updatedItem) {
      let storage = this.getDb(key);
  
      for (let entry in storage) {
        if (storage[entry].id === id) {
          storage[entry] = updatedItem;
        }
      }
      this.setDb(key, storage);
    }
    export const synced = (value) => {
    //  synced(value) {
      this.set('synced', value);
    }
    export const isSynced = () => {
    //  isSynced() {
      return this.getDb('synced');
    }
       /**
     * Add to LocalStorage
     * @param {*} key 
     * @param {*} value 
     */


       // Função para atualizar um objeto no storage de acordo com o índice
export const updateByIndex = (key, index, newValue) => {
  let storage = JSON.parse(localStorage.getItem(key));

  // Verifica se o storage é um array e se o índice é válido
  if (Array.isArray(storage) && index >= 0 && index < storage.length) {
    storage[index] = newValue;
    setDb(key, storage);
  } else {
    console.error('Índice inválido ou storage não é um array');
  }
};

// Exemplo de uso
// Adiciona um novo objeto ao storage
// add('myData', { name: 'Object 1', value: 100 });
// add('myData', { name: 'Object 2', value: 200 });

// Atualiza o objeto no índice 1
// updateByIndex('myData', 1, { name: 'Updated Object 2', value: 300 });
      
      export const add = (key, value) => {
          let storage = JSON.parse(localStorage.getItem(key));
        
          if (storage !== null) {
            // Se o storage já existe e é um array, adiciona o valor ao array
            if (Array.isArray(storage)) {
              storage.push(value);
            } else {
              // Se o storage não é um array (mas existe), converte em array
              storage = [storage, value];
            }
          } else {
            // Se o storage não existe, cria um array com o valor
            storage = [value];
          }
        
          setDb(key, storage);
        };