import { Box, ButtonBase, Card, List, ListItem, Typography, useTheme } from '@mui/material';
import type { FC } from 'react';
import type { LabelListTextCardProps } from '../model/types';
import { Iconify } from 'src/components/iconify';

const LabelListTextCard: FC<LabelListTextCardProps> = ({
  listText,
  action,
  headerText,
  sectionBottom
}) => {
  const theme = useTheme()
  return (
    <ButtonBase 
    sx={{
      textAlign: 'start',
      width: "100%", height: "100%"
    }}
    onClick={action}>
      <Card variant='outlined'
      sx={{width:"100%", height: "100%"}}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            px: 1.5,
            py: 1.5,
            height: "100%",
            placeItems: 'center',
            alignItems: 'start',
          }}
        >
          <Iconify localIcon="medical-checkup" sxIcon={{ width: 50 }} />
          <Box height="100%" display="flex" flexDirection="column">
            {headerText && (
              <Typography variant="subtitle2" color="secondary.dark">
                {headerText}
              </Typography>
            )}
            <Box flex={1}>
              {listText.length > 0 && (
                <List
                  sx={{
                    padding: 0,
                    listStyleType: 'disc',
                    paddingLeft: 2
                  }}
                >
                  {listText.map((it, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        padding: 0,
                        display: 'list-item',
                        "::marker": {
                          color: theme.palette.secondary.dark
                        }
                      }}
                    >
                      <Typography variant="caption" color="secondary.dark">{it}</Typography>
                    </ListItem>
                  ))}
                </List>
              )}

            </Box>
            {sectionBottom}
          </Box>
        </Box>
        </Card>
      </ButtonBase>
  );
};

export default LabelListTextCard;
