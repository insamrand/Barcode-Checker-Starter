import React, { Component } from "react";
import { View } from "react-native";
import { Content, List, ListItem, Text, Body, Button, Icon } from "native-base";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "../../redux/actions";

export class HomePage extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Text>Home</Text>,
      headerRight: (
        <Button transparent onPress={() => navigation.navigate("ScanPopup")}>
          <Icon name="barcode" />
        </Button>
      )
    };
  };

  render() {
    const { barcodes } = this.props;

    // console.log(barcodes);

    if (!barcodes) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Scan something...</Text>
        </View>
      );
    }

    return (
      <Content>
        <List>
          {barcodes.map((item, index) => {
            return (
              <ListItem key={index} button={true}>
                <Text>{item.barcodeData}</Text>
              </ListItem>
            );
          })}
        </List>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  barcodeData: state.app.scannedBarcode,
  barcodes: state.app.barcodes
});

const mapDispatchToProps = dispatch => {
  return {
    loadExistBarcodeData: () => actions.requestBarcodeData(dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
