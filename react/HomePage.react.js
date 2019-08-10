// @flow

import * as React from "react";

import {
  Page,
  Avatar,
  Icon,
  Grid,
  Card,
  Text,
  Table,
  Alert,
  Progress,
  colors,
  Dropdown,
  Button,
  StampCard,
  StatsCard,
  ProgressCard,
  Badge,
} from "tabler-react";

import C3Chart from "react-c3js";

import SiteWrapper from "./SiteWrapper.react";
import json from "./ledger/registrations.json";
import eventjson from  "./ledger/events.json";

// import evtjson from "./data/events.json";
//let eventjson = sortBy('timestamp', evtjson);
  
eventjson.sort(function(a, b) {
     return b.level > a.level || b.timestamp > a.timestamp
});


let eventImageDefault = "demo/icons/green.png";
let eventImageRed = "demo/icons/red.png";


function Home() {
  return (
    <SiteWrapper>
      <Page.Content title="CONGA CO-OP Dashboard">
        <Grid.Row cards={true}>
          <Grid.Col width={6} sm={4} lg={2}>
            <StatsCard layout={1} movement={6} total="43" label="No. of Farms" />
          </Grid.Col>
          <Grid.Col width={6} sm={4} lg={2}>
            <StatsCard
              layout={1}
              movement={-3}
              total="1700"
              label="Tracked Animals"
            />
          </Grid.Col>
          <Grid.Col width={6} sm={4} lg={2}>
            <StatsCard layout={1} movement={9} total="120" label="Registered this Month" />
          </Grid.Col>
          <Grid.Col width={6} sm={4} lg={2}>
            <StatsCard
              layout={1}
              movement={3}
              total="27.3k"
              label="Twitter Followers"
            />
          </Grid.Col>
          <Grid.Col width={6} sm={4} lg={2}>
            <StatsCard
              layout={1}
              movement={-2}
              total="$95k"
              label="LiveStock earnings"
            />
          </Grid.Col>
          <Grid.Col width={6} sm={4} lg={2}>
            <StatsCard layout={1} movement={-1} total="621" label="Animals Certified" />
          </Grid.Col>
          <Grid.Col lg={6}>
            <Card>
              <Card.Header>
                <Card.Title> SheepGoat Transportation: Recent Temp Trends </Card.Title>
              </Card.Header>
              <C3Chart
                style={{ height: "20rem" }}
                data={{
                  columns: [
                    // each columns data
                    [
                      'data1',
		      72,
		      75,
                      75,
                      75,
                      75,
                      75,
                      75,
                      75,
                      75,
                      75,
                      81,
                      81,
                      81,
                      81,
                      89,
                      96,
                      96,
                      96,
                      98,
                      98,
                      96,
                      96,
                      96,
                      98
                    ]
                  ],
		  axes: {
            		data1: 'y'
        	  },
                  type: "area", // default type of chart
                  groups: [["data1", "data2", "data3"]],
                  colors: {
                    data1: colors["blue"],
                  },
                  names: {
                    // name of each serie
                    data1: "In-Transit Readings",
                  },
                }}
                axis={{
                  x: {
                    padding: {
                      left: 0,
                      right: 0,
                    },
		    label: 'Transit Hours',
                    tick: {
                      outer: true,
		      format: '%n'
                    },
                  },
                  y: {
                    padding: {
                      left: 0,
                      right: 0,
                      top: 6
                    },
		    label: {
			    text: 'Temperature in Fahrenheit',
			    position: 'inner-bottom',
	            },
		    tick: {
                         outer: false,
                         values: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            	    },
                  }
                }}
                legend={{
                  position: "inset",
                  padding: 0,
                  inset: {
                    anchor: "top-left",
                    x: 20,
                    y: 8,
                    step: 10,
                  },
                }}
                padding={{
                  bottom: 2,
                  left: 30,
                  right: 2,
                }}
                point={{
                  show: false,
                }}
              />
              <Card.Header>
                <Card.Title>Latest Sheepgoat Registrations</Card.Title> {/* for id use {json[0].data.id}</Card.Title> */}
              </Card.Header>
              <Table
                cards={true}
                striped={true}
                responsive={true}
                className="table-vcenter"
              >
                <Table.Header>
                  <Table.Row>
                    <Table.ColHeader>ID</Table.ColHeader>
                    <Table.ColHeader>Reg Date</Table.ColHeader>
                    <Table.ColHeader>Location</Table.ColHeader>
                    <Table.ColHeader>Status</Table.ColHeader>
                    <Table.ColHeader />
                  </Table.Row>
                </Table.Header>
                <Table.Body>
	        <React.Fragment>
	        {json.map((item, key) => (
                  <Table.Row>
                    <Table.Col>{item.id}</Table.Col>
                    <Table.Col>{item.dob}</Table.Col>
                    <Table.Col>{item.location}</Table.Col>
                    <Table.Col>{item.status}</Table.Col>
			{ /*<Table.Col className="text-nowrap">{item.status}</Table.Col> */}
                    <Table.Col className="w-1">
                      <Avatar size="sm" imageURL="./demo/icons/ledger.png" />
                    </Table.Col>
                  </Table.Row>
	         ))}
	        </React.Fragment>
                </Table.Body>
              </Table>
            </Card>
          </Grid.Col>

          <Grid.Col md={6}>
            <Alert type="primary">
              <Alert.Link
                href={
                  process.env.NODE_ENV === "production"
                    ? "https://tabler.github.io/tabler-react/documentation"
                    : "/documentation"
                }
              >
                Bulletins :      
              </Alert.Link>{" "}
                    Figures and stats as of July 25th 2019 09:00:00 UTC
            </Alert>
            <Grid.Row>
              <Grid.Col sm={6}>
                <Card>
                  <Card.Header>
                    <Card.Title>LiveStock killed by Wolves</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <C3Chart
                      style={{ height: "13rem" }}
                      data={{
                        columns: [
                          // each columns data
                          ["data1", 22],
                          ["data2", 78],
                        ],
                        type: "donut", // default type of chart
                        colors: {
                          data1: colors["green"],
                          data2: colors["black-light"],
                        },
                        names: {
                          // name of each serie
                          data1: "Sheepgoats",
                          data2: "Cattle",
                        },
                      }}
                      legend={{
                        show: false, //hide legend
                      }}
                      padding={{
                        bottom: 0,
                        top: 0,
                      }}
                    />
                  </Card.Body>
                </Card>
              </Grid.Col>
              <Grid.Col sm={6}>
                <Card>
                  <Card.Header>
                    <Card.Title>LiveStock killed by Drivers</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <C3Chart
                      style={{ height: "13rem" }}
                      data={{
                        columns: [
                          // each columns data
                          ["data1", 50],
                          ["data2", 40],
                          ["data3", 10],
                        ],
                        type: "donut", // default type of chart
                        colors: {
                          data1: colors["red-light"],
                          data2: colors["orange-light"],
                          data3: colors["green"],
                        },
                        names: {
                          // name of each serie
                          data1: "Llamas",
                          data2: "Camels",
                          data3: "Sheepgoats",
                        },
                      }}
                      legend={{
                        show: false, //hide legend
                      }}
                      padding={{
                        bottom: 0,
                        top: 0,
                      }}
                    />
                  </Card.Body>
                </Card>
              </Grid.Col>
              <Grid.Col sm={6}>
                <Card>
                  <Card.Header>
                    <Card.Title>Vets Registered by County/YTD</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <C3Chart
                      style={{ height: "13rem" }}
                      data={{
                        columns: [
                          // each columns data
                          ["data1", 63],
                          ["data2", 44],
                          ["data3", 12],
                          ["data4", 14],
                        ],
                        type: "pie", // default type of chart
                        colors: {
                          data1: colors["blue-darker"],
                          data2: colors["blue"],
                          data3: colors["blue-light"],
                          data4: colors["blue-lighter"],
                        },
                        names: {
                          // name of each serie
                          data1: "Devon",
                          data2: "Cornwall",
                          data3: "Somerset",
                          data4: "Avon",
                        },
                      }}
                      legend={{
                        show: false, //hide legend
                      }}
                      padding={{
                        bottom: 0,
                        top: 0,
                      }}
                    />
                  </Card.Body>
                </Card>
              </Grid.Col>
              <Grid.Col sm={6}>
                <Card>
                  <Card.Header>
                    <Card.Title> New Lambs by County/YTD</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <C3Chart
                      style={{ height: "13rem" }}
                      data={{
                        columns: [
                          // each columns data
                          ["data1", 63],
                          ["data2", 44],
                          ["data3", 12],
                          ["data4", 14],
                        ],
                        type: "pie", // default type of chart
                        colors: {
                          data1: colors["maroon-darker"],
                          data2: colors["maroon"],
                          data3: colors["maroon-light"],
                          data4: colors["maroon-lighter"],
                        },
                        names: {
                          // name of each serie
                          data1: "Devon",
                          data2: "Cornwall",
                          data3: "Somerset",
                          data4: "Avon",
                        },
                      }}
                      legend={{
                        show: false, //hide legend
                      }}
                      padding={{
                        bottom: 0,
                        top: 0,
                      }}
                    />
                  </Card.Body>
                </Card>
              </Grid.Col>
              <Grid.Col sm={6}>
                <ProgressCard
                  header="New feedback"
                  content="62"
                  progressColor="red"
                  progressWidth={28}
                />
              </Grid.Col>
              <Grid.Col sm={6}>
                <ProgressCard
                  header="Todays profit (running)"
                  content="£6520"
                  progressColor="green"
                  progressWidth={84}
                />
              </Grid.Col>
              <Grid.Col sm={6}>
                <ProgressCard
                  header="Registered holdings"
                  content="1076"
                  progressColor="yellow"
                  progressWidth={34}
                />
              </Grid.Col>
              <Grid.Col sm={6}>
                <ProgressCard
                  header="Lords a Leaping"
                  content="76"
                  progressColor="orange"
                  progressWidth={34}
                />
              </Grid.Col>
            </Grid.Row>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row cards deck>
          <Grid.Col width={12}>
            <Card>
              <Card.Header>
                <Card.Title>Recent Blockchain Events:     Info:   <Avatar size="vsm" imageURL="demo/icons/green.png" className="w-1"/><Avatar imageURL="demo/icons/white.png" className="w-1"/>Warning:  <Avatar size="vsm" imageURL="demo/icons/orange.png" className="w-1" /><Avatar imageURL="demo/icons/white.png" className="w-1"/>Critical: <Avatar size="vsm" imageURL="demo/icons/red.png" className="w-1" /></Card.Title>
              </Card.Header>
              <Table
                responsive
                highlightRowOnHover
                hasOutline
                verticalAlign="center"
                cards
                className="text-nowrap"
              >
                <Table.Header>
                  <Table.Row>
                    <Table.ColHeader alignContent="left" className="w-1">
                      <i className="icon-people" />
                    </Table.ColHeader>
                    <Table.ColHeader alignContent="left">Event Date</Table.ColHeader>
                    <Table.ColHeader alignContent="left">Event Type</Table.ColHeader>
                    <Table.ColHeader>Activity</Table.ColHeader>
                    <Table.ColHeader>Detected At</Table.ColHeader>
                    <Table.ColHeader alignContent="left">
                      Status
                    </Table.ColHeader>
                    <Table.ColHeader alignContent="left">
                      <i className="icon-settings" />
                    </Table.ColHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
	             <React.Fragment>
	             {eventjson.map((evitem, key) => (
                     <Table.Row>
                        <Table.Col alignContent="center">
                          <Avatar 
			    size="sm"
                            imageURL={ ( `${evitem.level}` > 1) ? eventImageRed : eventImageDefault }
                            className="w-1"
                          />
                        </Table.Col>
                         <Table.Col>{evitem.timestamp}</Table.Col>
                         <Table.Col>Tracking</Table.Col>
                         <Table.Col>{evitem.action}</Table.Col>
                         <Table.Col>{evitem.animal.location}</Table.Col>
                         <Table.Col className="text-nowrap">{evitem.animal.status}</Table.Col>
                         <Table.Col className="w-1">
                           <Avatar imageURL="./demo/icons/ledger.png" />
                         </Table.Col>
                    <Table.Col alignContent="center">
                      <Dropdown
                        trigger={
                          <Dropdown.Trigger
                            icon="more-vertical"
                            toggle={false}
                          />
                        }
                        position="right"
                        items={
                          <React.Fragment>
                            <Dropdown.Item icon="file">Report as Emergency</Dropdown.Item>
                            <Dropdown.Item icon="flag">
                              Escalate to Regulator{" "}
                            </Dropdown.Item>
                            <Dropdown.Item icon="eye">
                              {" "}
                              Notify Local Authority
                            </Dropdown.Item>
                            <Dropdown.ItemDivider />
                            <Dropdown.Item icon="zoom-in">
                              Browse Event Detail
                            </Dropdown.Item>
                          </React.Fragment>
                        }
                      />
                    </Table.Col>
                  </Table.Row>
	          ))}
	          </React.Fragment>
                </Table.Body>
              </Table>
            </Card>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col md={6} lg={12}>
          <Card title="Rolling Monthly Totals YTD 2018/2019">
            <Grid.Row>
              <Grid.Col sm={6} lg={3}>
                <StatsCard
                  layout={2}
                  movement={5}
                  total="423"
                  label="Animals Registered/Mth"
                  chart={
                    <C3Chart
                      style={{ height: "100%" }}
                      padding={{
                        bottom: -10,
                        left: -1,
                        right: -1,
                      }}
                      data={{
                        names: {
                          data1: "New registrations",
                        },
                        columns: [["data1", 30, 40, 10, 40, 12, 22, 40, 42, 42, 32, 33, 31]],
		        axes: {
            	    	      data1: 'y'
        	        },
                        type: "area",
                      }}
                      legend={{
                        show: false,
                      }}
                      transition={{
                        duration: 0,
                      }}
                      point={{
                        show: false,
                      }}
                      tooltip={{
                        format: {
                          title: function(x) {
                            return "";
                          },
                        },
                      }}
                      axis={{
                        y: {
                          padding: {
                            bottom: 0,
                          },
                          show: false,
                          tick: {
                            outer: false,
                          },
                        },
                        x: {
			  type:'category',
                          categories: ['A', 'S', 'O', 'N', 'D', 'J', 'F','M', 'A', 'M','J', 'J','A'],
                          padding: {
                            left: -1,
                            right: -1,
                          },
                          label: 'accrued totals',
                          show: true,
                          tick: {
		             outer: false,
                          },
                        },
                      }}
                      color={{
                        pattern: ["#467fcf"],
                      }}
                    />
                  }
                />
              </Grid.Col>
              <Grid.Col sm={6} lg={3}>
                <StatsCard
                  layout={2}
                  movement={-3}
                  total="423"
                  label="LiveStock Purges/Mth"
                  chart={
                    <C3Chart
                      style={{ height: "100%" }}
                      padding={{
                        bottom: -10,
                        left: -1,
                        right: -1,
                      }}
                      data={{
                        names: {
                          data1: "Users online",
                        },
                        columns: [["data1", 30, 40, 10, 40, 12, 22, 40, 42, 42, 32, 33, 31]],
                        type: "area",
                      }}
                      legend={{
                        show: false,
                      }}
                      transition={{
                        duration: 0,
                      }}
                      point={{
                        show: false,
                      }}
                      tooltip={{
                        format: {
                          title: function(x) {
                            return "";
                          },
                        },
                      }}
                      axis={{
                        y: {
                          padding: {
                            bottom: 0,
                          },
                          show: false,
                          tick: {
                            outer: false,
                          },
                        },
                        x: {
			  type:'category',
                          categories: ['A', 'S', 'O', 'N', 'D', 'J', 'F','M', 'A', 'M','J', 'J','A'],
                          padding: {
                            left: -1,
                            right: -1,
                          },
                          label: 'accrued totals',
                          show: true,
                          tick: {
		             outer: false,
                          },
                        },
                      }}
                      color={{
                        pattern: ["#e74c3c"],
                      }}
                    />
                  }
                />
              </Grid.Col>
              <Grid.Col sm={6} lg={3}>
                <StatsCard
                  layout={2}
                  movement={-3}
                  total="423"
                  label="Animals to Research/Mth"
                  chart={
                    <C3Chart
                      style={{ height: "100%" }}
                      padding={{
                        bottom: -10,
                        left: -1,
                        right: -1,
                      }}
                      data={{
                        names: {
                          data1: "Users online",
                        },
                        columns: [["data1", 30, 40, 10, 40, 12, 22, 40, 42, 42, 32, 33, 31]],
                        type: "area",
                      }}
                      legend={{
                        show: false,
                      }}
                      transition={{
                        duration: 0,
                      }}
                      point={{
                        show: false,
                      }}
                      tooltip={{
                        format: {
                          title: function(x) {
                            return "";
                          },
                        },
                      }}
                      axis={{
                        y: {
                          padding: {
                            bottom: 0,
                          },
                          show: false,
                          tick: {
                            outer: false,
                          },
                        },
                        x: {
			  type:'category',
                          categories: ['A', 'S', 'O', 'N', 'D', 'J', 'F','M', 'A', 'M','J', 'J','A'],
                          padding: {
                            left: -1,
                            right: -1,
                          },
                          label: 'accrued totals',
                          show: true,
                          tick: {
		             outer: false,
                          },
                        },
                      }}
                      color={{
                        pattern: ["#5eba00"],
                      }}
                    />
                  }
                />
              </Grid.Col>
              <Grid.Col sm={6} lg={3}>
                <StatsCard
                  layout={2}
                  movement={9}
                  total="423"
                  label="TB Vaccines Adm /Mth"
                  chart={
                    <C3Chart
                      style={{ height: "100%" }}
                      padding={{
                        bottom: -10,
                        left: -1,
                        right: -1,
                      }}
                      data={{
                        names: {
                          data1: "Users online",
                        },
                        columns: [["data1", 30, 40, 10, 40, 12, 22, 40, 42, 42, 32, 33, 31]],
                        type: "area",
                      }}
                      legend={{
                        show: false,
                      }}
                      transition={{
                        duration: 0,
                      }}
                      point={{
                        show: false,
                      }}
                      tooltip={{
                        format: {
                          title: function(x) {
                            return "";
                          },
                        },
                      }}
                      axis={{
                        y: {
                          padding: {
                            bottom: 0,
                          },
                          show: false,
                          tick: {
                            outer: false,
                          },
                        },
                        x: {
			  type:'category',
                          categories: ['A', 'S', 'O', 'N', 'D', 'J', 'F','M', 'A', 'M','J', 'J','A'],
                          padding: {
                            left: -1,
                            right: -1,
                          },
                          label: 'accrued totals',
                          show: true,
                          tick: {
		             outer: false,
                          },
                        },
                      }}
                      color={{
                        pattern: ["#f1c40f"],
                      }}
                    />
                  }
                />
              </Grid.Col>
            </Grid.Row>
          </Card>
          </Grid.Col>
          <Grid.Col width={12}>
            <Card title="Notices Issued">
              <Table
                responsive
                className="card-table table-vcenter text-nowrap"
                headerItems={[
                  { content: "No.", className: "w-1" },
                  { content: "Subject" },
                  { content: "Client" },
                  { content: "Coop ID" },
                  { content: "Issued" },
                  { content: "Status" },
                  { content: "Fine" },
                  { content: null },
                  { content: null },
                ]}
                bodyItems={[
                  {
                    key: "1",
                    item: [
                      {
                        content: (
                          <Text RootComponent="span" muted>
                            001401
                          </Text>
                        ),
                      },
                      {
                        content: (
                          <a href="invoice.html" className="text-inherit">
                            Inadequate Sheepgoat nutrition 
                          </a>
                        ),
                      },
                      { content: "Avondale Farm" },
                      { content: "87956621" },
                      { content: "15 July 2019" },
                      {
                        content: (
                          <React.Fragment>
                            <span className="status-icon bg-success" /> Overdue
                          </React.Fragment>
                        ),
                      },
                      { content: "$1000" },
                      {
                        alignContent: "right",
                        content: (
                          <React.Fragment>
                            <Button size="sm" color="secondary">
                              Manage
                            </Button>
                            <div className="dropdown">
                              <Button
                                color="secondary"
                                size="sm"
                                isDropdownToggle
                              >
                                Actions
                              </Button>
                            </div>
                          </React.Fragment>
                        ),
                      },
                      { content: <Icon link name="edit" /> },
                    ],
                  },
                ]}
              />
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Page.Content>
    </SiteWrapper>
  );
}

function sortBy(key, data) {
	return data.sort((a, b) => {
	var x = parseInt(a[key]); 
	var y = parseInt(b[key]);
	return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	});
}

export default Home;
