const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

// DBJsonDK
export class DBJsonDK {

  // variables
  private data: any[] = [];
  private filePath: string = '';

  // constructor
  constructor(filePath: string) {
    this.filePath = filePath;
    this.data = this.loadData();
  }

  // loadData
  private loadData(): any {

    // Validar archivo
  if (fs.existsSync(this.filePath)) {
    
    // Leer el archivo
    const jsonData = fs.readFileSync(this.filePath, 'utf-8');
    const parsedData = JSON.parse(jsonData);

    // Validar si el archivo tiene datos
    if (Array.isArray(parsedData) && parsedData.length > 0) {
      return parsedData;
    } else {
      // Si el archivo está vacío, crearlo nuevamente
      fs.writeFileSync(this.filePath, JSON.stringify([]));
      return [];
    }

  } else {
    // Si no existe el archivo, se crea
    fs.writeFileSync(this.filePath, JSON.stringify([]));
    return [];
  }

  } // Fin loadData

  // getAll
  public getAll(): any[] {
    return this.data;
  } // Fin getAll

  // getById
  public getById(id: string): any {
    return this.data.find(item => item.id === id);
  } // Fin getById

  // add
  public add(item: Omit<any, 'id' | 'createdAt' | 'updatedAt'>, includeDates: boolean = true): void {

    const newItem: any = {
      id: uuidv4(),
      ...item
    };

    if (includeDates) {
      newItem.createdAt = moment().format('DD/MM/YYYY, h:mm:ssa');
      newItem.updatedAt = ''
    }

    this.data.push(newItem);
    this.save();

  } // Fin add

  // update
  public update(id: string, updatedItem: Partial<any>): boolean {

    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) {
      return false;
    }

    // Actualizar los campos del registro
    this.data[index] = {
      ...this.data[index],
      ...updatedItem
    };

    // Solo actualizar updatedAt si ya existe
    if (this.data[index].updatedAt !== undefined) {
      this.data[index].updatedAt = moment().format('DD/MM/YYYY, h:mm:ssa');
    }

    this.save();
    return true;

  } // Fin update

  // delete
  public delete(id: string): boolean {

    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) {
      return false; 
    }
    this.data.splice(index, 1); 
    this.save();
    return true;

  } // Fin delete

  // search
  public search(criteria: Partial<any>): any[] {

    return this.data.filter(item => {
      return Object.keys(criteria).every(key => 
        item[key] === criteria[key]
      );
    });

  } // Fin search

  // count
  public count(): number {
    return this.data.length;
  } // Fin Count

  // clear
  public clear(): void {

    this.data = [];
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));

  } // Fin clear

  // save
  public save(): void {
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
  } // Fin save

} // Fin class