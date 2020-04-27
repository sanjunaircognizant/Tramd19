import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import StatusBullet from './StatusBullet';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const statusColors = {
  approved: 'success',
  pending: 'info',
  refunded: 'danger'
};

const LatestOrders = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
console.log(props.onClickView);
  let rides=props.riders;

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
       
        title="RIDE REQUESTS"
      />
      <Divider />
      {rides.length==0 && <CardContent className={classes.content}>
      <h5 style={{marginLeft:"1rem"}}> No Ride Requests for the Day</h5>
      </CardContent> }
      {rides.length>0 && <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Source State/ District</TableCell>
                  <TableCell>Destination State/ District</TableCell>
                  <TableCell sortDirection="desc">
                  Requested Date                      
                  </TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Purpose</TableCell>
                  <TableCell>Approx. KMS</TableCell>
                  <TableCell>Vechicle Number</TableCell>
                  <TableCell>Mobile Number</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rides.map((ride,indx) => (
                  <TableRow
                    hover
                    key={ride}
                  >            
                    <TableCell>{ride.sourceState}/{ride.sourceDistrict}</TableCell>
                    <TableCell>{ride.destinationState}/{ride.destinationDistrict}</TableCell>
                    <TableCell>
                      {moment(new Date(ride.requestedDate)).format('DD/MM/YYYY')}
                    </TableCell>
                    
                    <TableCell>
                      <div className={classes.statusContainer}>
                        <StatusBullet
                          className={classes.status}
                          color={statusColors[ride.riderStatus?ride.riderStatus.toLowerCase():"pending"]}
                          size="sm"
                        />
                        {ride.riderStatus}
                      </div>
                    </TableCell>
                    <TableCell>{ride.purpose}</TableCell>
                    <TableCell>{ride.approxKms}</TableCell>
                    <TableCell>{ride.vehicleNumber}</TableCell>
                    <TableCell>{ride.mobileNum}</TableCell>
                    
                    <TableCell>
                    <Button
                       color="primary"
                        size="small"
                        variant="outlined"
                        onClick={props.onClickView.bind(this,ride,indx)}
                        >
                      View
                   </Button>
                   
                    </TableCell>
                  </TableRow>
                  
                ))}
                
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>}
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
