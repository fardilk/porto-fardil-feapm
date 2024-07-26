import { Box, Button, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { FC, ReactNode, useMemo } from "react";
import { RHFTimePils } from "src/components/hook-form";
import { NewPatientProps } from "../model/types";

const bloodType = [
  {
    label: "AB-",
    value: "ab-"
  },
  {
    label: "B-",
    value: "b-"
  },
  {
    label: "A-",
    value: "a-"
  },
  {
    label: "O",
    value: "o"
  },
  {
    label: "AB+",
    value: "ab+"
  },
  {
    label: "B+",
    value: "b+"
  },
  {
    label: "A+",
    value: "a+"
  },
  {
    label: "A",
    value: "a"
  },
  {
    label: "B",
    value: "b"
  },
  {
    label: "AB",
    value: "ab"
  },
  {
    label: "O-",
    value: "o-"
  }
]

const study = [
  {
    label: "Tidak Diketahui",
    value: "tidak_diketahui"
  },
  {
    label: "Pre Sekolah",
    value: "pre_sekolah"
  },
  {
    label: "SD",
    value: "sd"
  },
  {
    label: "SMP",
    value: "smp"
  },
  {
    label: "SMA",
    value: "sma"
  },
  {
    label: "D1",
    value: "d1"
  },
  {
    label: "D2",
    value: "d2"
  },
  {
    label: "D3",
    value: "d3"
  },
  {
    label: "D4",
    value: "d4"
  },
  {
    label: "S1",
    value: "s1"
  },
  {
    label: "S2",
    value: "s2"
  },
  {
    label: "S3",
    value: "s3"
  }
]

const religion = [
  {
    label: "Islam",
    value: "islam"
  },
  {
    label: "Kristen Protestan",
    value: "kristen_protestan"
  },
  {
    label: "Katholik",
    value: "katholik"
  },
  {
    label: "Hindu",
    value: "hindu"
  },
  {
    label: "Budha",
    value: "budha"
  },
  {
    label: "Konghucu",
    value: "konghucu"
  },
  {
    label: "Lainnya",
    value: "lainnya"
  }
]

const marriage = [
  {
    label: "Cerai",
    value: "cerai"
  },
  {
    label: "Menikah",
    value: "menikah"
  },
  {
    label: "Belum Menikah",
    value: "belum_menikah"
  }
]

const language = [
  {
    label: "Bahasa Indonesai",
    value: "indonesia"
  },
  {
    label: "Bahasa Inggris",
    value: "english"
  }
]

const job = [
  {
    label: "Tidak Bekerja",
    value: "tidak_bekerja"
  },
  {
    label: "Wirausaha",
    value: "wirausaha"
  },
  {
    label: "Pelajar/Mahasiswa",
    value: "pelajar/mahasiswa"
  },
  {
    label: "Karyawan Swasta",
    value: "karyawan_swasta"
  },
  {
    label: "PNS",
    value: "PNS"
  },
  {
    label: "Mengurus Rumah Tangga",
    value: "mengurus_rumah_tangga"
  },
  {
    label: "TNI",
    value: "TNI"
  },
  {
    label: "POLRI",
    value: "POLRI"
  },
  {
    label: "Petani",
    value: "Petani"
  },
  {
    label: "Peternak",
    value: "peternak"
  },
  {
    label: "Karyawan BUMN/BUMD",
    value: "karyawan_BUMN/BUMD"
  },
  {
    label: "Guru",
    value: "guru"
  },
  {
    label: "Asisten Rumah Tangga",
    value: "asisten_rumah_tangga"
  },
  {
    label: "Buruh",
    value: "buruh"
  },
  {
    label: "Pensiunan",
    value: "pensiunan"
  },
  {
    label: "Nelayan",
    value: "nelayan"
  },
  {
    label: "Konstruksi",
    value: "konstruksi"
  },
  {
    label: "Perdagangan",
    value: "perdagangan"
  },
  {
    label: "Transportasi",
    value: "transportasi"
  },
  {
    label: "Honorer",
    value: "honorer"
  },
  {
    label: "Wartawan",
    value: "wartawan"
  },
  {
    label: "Dosen",
    value: "dosen"
  },
]

const DetailNewPatient : FC<NewPatientProps> = ({handleNextPage, handlePreviousPage}) => {

  const listType = useMemo(() => [
    {
      label: "Golongan Darah",
      name: "bloodType",
      options: bloodType
    },
    {
      label: "Agama",
      name: "religion",
      options: religion
    },
    {
      label: "Pendidikan",
      name: "study",
      options: study
    },
    {
      label: "Status Pernikahan",
      name: "marriage",
      options: marriage
    },
    {
      label: "Pekerjaan",
      name: "job",
      options: job
    },
    {
      label: "Bahasa Sehari-hari",
      name: "language",
      options: language
    },
  ],[])

  return (
    <>
    <TableContainer sx={{ my: 2 }}>
      <Table>
        <colgroup>
          <col width="30%" />
          <col width="70%" />
        </colgroup>
        <TableBody>
          {listType.map((list, index) => (
            <TableRow key={index}>
              <TableCellBody titleText={list.label} />
              <TableCellBody>
                <RHFTimePils
                  name={list.name}
                  options={list.options}
                  getOptionLabel={opt => opt.label}
                  getOptionEqualToValue={(opt, value) => opt.value === value?.value}
                />
              </TableCellBody>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Box sx={{ display: "flex", placeContent: "space-between", gap: 2 }}>
      <Button size="large" variant="outlined" fullWidth color="secondary" onClick={handlePreviousPage}>Kembali</Button>
      <Button size="large" variant="contained" fullWidth color="secondary" onClick={handleNextPage}>Selanjutnya</Button>
    </Box>
    </>
  )
}

export default DetailNewPatient

// INI SEBENARNYA BISA DI REUSABLE DI GLOBAL COMPONENT
const TableCellBody = ({ titleText, children }: { titleText?: string, children?: ReactNode }) => {
  return (
    <TableCell borderbottom="noborder" sx={{
      paddingBottom: 3
    }}>
      {
        titleText && (
          <Typography variant="subtitle1" color="grey.600">
            {titleText}
          </Typography>
        )
      }

      {children && children}
    </TableCell>
  )
}
