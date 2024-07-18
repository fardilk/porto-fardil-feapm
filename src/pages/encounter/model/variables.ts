export const getPaymentType = (type: string) => {
  switch (type) {
    case 'general':
      return {
        title: 'Tipe Pembayaran',
        body: 'Umum',
        localIcon: 'pembayaran-umum',
      };
    case 'insurance':
      return {
        title: 'Tipe Pembayaran',
        body: 'Asuransi',
        localIcon: 'asuransi',
      };

    case 'company':
      return {
        title: 'Tipe Pembayaran',
        body: 'Perusahaan',
        localIcon: 'perusahaan',
      };

    default:
      return {
        title: 'Tipe Pembayaran',
        body: 'BPJS',
        localIcon: 'bpjs',
      };
  }
};
