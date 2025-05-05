import { fDate, formatStr } from './format-time';
import { provinsi, kabkot, kecamatan } from './wilayah';

export interface NikDetail {
  isValid: Function;
  provinceId: Function;
  province: Function;
  kabupatenKotaId: Function;
  kabupatenKota: Function;
  kecamatanId: Function;
  kecamatan: Function;
  kodepos: Function;
  kelamin: Function;
  lahir: Function;
  uniqcode: Function;
  sanitizedKabkot: Function;
  tempatLahir: Function;
}

export const nikParser = (nik: string): NikDetail => ({
  isValid(): boolean {
    const isValidLength = (): boolean => nik.length === 16;
    const isValidProvinsi = (): boolean => !!this.province();
    const isValidKabupatenKota = (): boolean => !!this.kabupatenKota();
    const isValidKecamatan = (): boolean => !!this.kecamatan();

    return isValidLength() && isValidProvinsi() && isValidKabupatenKota() && isValidKecamatan();
  },

  sanitizedKabkot(): Record<string, string> {
    return Object.fromEntries(
      Object.entries(kabkot).map(([code, name]) => {
        const sanitizedName = name.replace(/^KAB\. |^KOTA /, '').trim();
        const capitalizedSanitizedName = sanitizedName
          .toLowerCase()
          .replace(/\b\w/g, (char) => char.toUpperCase());
        return [code, capitalizedSanitizedName];
      })
    );
  },

  tempatLahir(): string {
    return this.sanitizedKabkot()[this.kabupatenKotaId()];
  },

  provinceId: (): string => nik.substring(0, 2),

  province(): string {
    return provinsi[this.provinceId()];
  },

  kabupatenKotaId: (): string => nik.substring(0, 4),

  kabupatenKota(): string {
    return kabkot[this.kabupatenKotaId()];
  },

  kecamatanId: (): string => nik.substring(0, 6),

  kecamatan(): string {
    if (kecamatan[this.kecamatanId()]) {
      return kecamatan[this.kecamatanId()].split(' -- ')[0];
    }
    return '';
  },

  kodepos(): string {
    if (kecamatan[this.kecamatanId()]) {
      return kecamatan[this.kecamatanId()].slice(-5);
    }
    return '';
  },

  kelamin(): string {
    return ((nik.substring(6, 8) || 0) as number) < 40 ? 'pria' : 'wanita';
  },

  lahir: (): string => {
    /* v1 */
    // const year = Number(nik.substring(10, 12));
    // const month = Number(nik.substring(8, 10));
    // const date = Number(nik.substring(6, 8));

    // return new Date(year, month - 1, date);

    /* v2 */
    const year = parseInt(nik.substring(10, 12), 10);
    const month = parseInt(nik.substring(8, 10), 10);
    let date = parseInt(nik.substring(6, 8), 10);

    if (date > 40) {
      date -= 40;
    }

    const currentYear = new Date().getFullYear();
    const currentYearLastDigits = currentYear % 100;

    let fullYear;
    if (year <= currentYearLastDigits) {
      fullYear = 2000 + year;
    } else {
      fullYear = 1900 + year;
    }

    const cDate = `${Number(date) < 10 ? `0${date}` : date}-${Number(month) < 10 ? `0${month}` : month}-${fullYear}`;

    return cDate;
  },

  uniqcode: (): string => nik.substring(12, 16),
});
