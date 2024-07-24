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
    <Card variant="outlined">
      <ButtonBase
        sx={{
          textAlign: 'start',
        }}
        onClick={action}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            px: 1.5,
            py: 1.5,
            placeItems: 'center',
            alignItems: 'start',
          }}
        >
          <Iconify localIcon="medical-checkup" sxIcon={{ width: 50 }} />
          <Box>
            {headerText && (
              <Typography variant="subtitle2" color="secondary.dark">
                {headerText}
              </Typography>
            )}
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
            {sectionBottom}
          </Box>
        </Box>
      </ButtonBase>
    </Card>
  );
};

export default LabelListTextCard;
