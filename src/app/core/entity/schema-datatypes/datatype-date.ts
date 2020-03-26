/*
 *     This file is part of ndb-core.
 *
 *     ndb-core is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     ndb-core is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with ndb-core.  If not, see <http://www.gnu.org/licenses/>.
 */

import { EntitySchemaDatatype } from '../schema/entity-schema-datatype';

export const dateEntitySchemaDatatype: EntitySchemaDatatype = {
  name: 'date',

  transformToDatabaseFormat: (value: Date) => {
    // TODO: should date format be saved as date object or as string "YYYY-mm-dd"?
    // return (value && !isNaN(value.getTime())) ? value.toISOString().slice(0, 10) : '';
    // DONE: date format is now being saved as date object
    return value;
  },

  transformToObjectFormat: (value) => {
    let date;
    if (!value || value === '') {
      date = undefined;
    } else {
      date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error('failed to convert data to Date object: ' + value);
      }
    }
    return date;
  },
};
