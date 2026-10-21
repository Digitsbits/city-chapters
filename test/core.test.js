import test from 'node:test';
import assert from 'node:assert/strict';
import {places,filterPlaces,sanitizeState,moveStop,itineraryText} from '../core.js';
test('category and search compose, case insensitively',()=>{assert.equal(filterPlaces('Food',' FIG ').length,1);assert.equal(filterPlaces('Culture','fig').length,0);});
test('saved filter handles an empty saved list',()=>{assert.deepEqual(filterPlaces('All','',[]),[]);assert.equal(filterPlaces('All','',['paper'])[0].id,'paper');});
test('storage sanitizer drops invalid and duplicated IDs',()=>{assert.deepEqual(sanitizeState({favorites:['paper','paper','missing'],itinerary:['river',null]}),{favorites:['paper'],itinerary:['river']});assert.deepEqual(sanitizeState(null),{favorites:[],itinerary:[]});});
test('reordering is immutable and respects boundaries',()=>{const ids=['paper','fig','river'];assert.deepEqual(moveStop(ids,1,-1),['fig','paper','river']);assert.deepEqual(ids,['paper','fig','river']);assert.deepEqual(moveStop(ids,0,-1),ids);assert.deepEqual(moveStop(ids,2,1),ids);});
test('export preserves chosen order, calculates stop time and disclaims fiction',()=>{const text=itineraryText(['river','paper']);assert.match(text,/1\. River Steps/);assert.match(text,/2\. The Paper Room/);assert.match(text,/60 minutes/);assert.match(text,/Fictional demo/);assert.match(text,/Walking time is not estimated/);});
test('all map pins have unique IDs and fit the SVG',()=>{assert.equal(new Set(places.map(p=>p.id)).size,places.length);for(const p of places){assert.ok(p.x>0&&p.x<940&&p.y>0&&p.y<610);assert.ok(p.minutes>0);}});
