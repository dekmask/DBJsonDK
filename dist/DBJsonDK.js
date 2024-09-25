"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBJsonDK = void 0;
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
// DBJsonDK
class DBJsonDK {
    // constructor
    constructor(filePath) {
        // variables
        this.data = [];
        this.filePath = '';
        this.filePath = filePath;
        this.data = this.loadData();
    }
    // loadData
    loadData() {
        // Validar archivo
        if (fs.existsSync(this.filePath)) {
            // Leer el archivo
            const jsonData = fs.readFileSync(this.filePath, 'utf-8');
            const parsedData = JSON.parse(jsonData);
            // Validar si el archivo tiene datos
            if (Array.isArray(parsedData) && parsedData.length > 0) {
                return parsedData;
            }
            else {
                // Si el archivo está vacío, crearlo nuevamente
                fs.writeFileSync(this.filePath, JSON.stringify([]));
                return [];
            }
        }
        else {
            // Si no existe el archivo, se crea
            fs.writeFileSync(this.filePath, JSON.stringify([]));
            return [];
        }
    } // Fin loadData
    // getAll
    getAll() {
        return this.data;
    } // Fin getAll
    // getById
    getById(id) {
        return this.data.find(item => item.id === id);
    } // Fin getById
    // add
    add(item, includeDates = true) {
        const newItem = Object.assign({ id: uuidv4() }, item);
        if (includeDates) {
            newItem.createdAt = moment().format('DD/MM/YYYY, h:mm:ssa');
            newItem.updatedAt = '';
        }
        this.data.push(newItem);
        this.save();
    } // Fin add
    // update
    update(id, updatedItem) {
        const index = this.data.findIndex(item => item.id === id);
        if (index === -1) {
            return false;
        }
        // Actualizar los campos del registro
        this.data[index] = Object.assign(Object.assign({}, this.data[index]), updatedItem);
        // Solo actualizar updatedAt si ya existe
        if (this.data[index].updatedAt !== undefined) {
            this.data[index].updatedAt = moment().format('DD/MM/YYYY, h:mm:ssa');
        }
        this.save();
        return true;
    } // Fin update
    // delete
    delete(id) {
        const index = this.data.findIndex(item => item.id === id);
        if (index === -1) {
            return false;
        }
        this.data.splice(index, 1);
        this.save();
        return true;
    } // Fin delete
    // search
    search(criteria) {
        return this.data.filter(item => {
            return Object.keys(criteria).every(key => item[key] === criteria[key]);
        });
    } // Fin search
    // count
    count() {
        return this.data.length;
    } // Fin Count
    // clear
    clear() {
        this.data = [];
        fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
    } // Fin clear
    // save
    save() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
    } // Fin save
} // Fin class
exports.DBJsonDK = DBJsonDK;
