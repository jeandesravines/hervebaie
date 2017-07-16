import React, { PureComponent } from "react";
import Menu, { MenuItem } from "material-ui/Menu";
import TextField from "material-ui/TextField";
import _ from "lodash";

type Props = {
  label: string | void,
  name: ?string,
  onChange: Function,
  options: Object | Array,
  value: string | number | void
};

type State = {
  opened: boolean,
  nodeRef: ?Element
};

/**
 * @param {Object} props
 * @return {*}
 */
export default class SelectField extends PureComponent<void, Props, State> {
  /**
   * @const {Object}
   * @private
   */
  props: Props;

  /**
   * @const {Object}
   * @private
   */
  state: State = {
    opened: false,
    nodeRef: null
  };

  /**
   * @param {string | value} value
   */
  setValue(value) {
    const {name, onChange} = this.props;
    const event = {
      target: {
        name,
        value,
        type: "select"
      }
    };

    onChange(event);
    this.hide();
  }

  /**
   *
   */
  show() {
    this.setState({
      opened: true
    });
  }

  /**
   *
   */
  hide() {
    this.setState({
      opened: false
    });
  }

  /**
   * @param {Element} node
   */
  setNodeRef(node) {
    this.setState({
      nodeRef: node
    });
  }

  /**
   * @return {Array.<Element>}
   */
  renderItems() {
    const {options, value} = this.props;

    return _.map(options, (text: string, key: string | number) => (
      <MenuItem
        key={key}
        selected={value === key}
        onClick={this.setValue.bind(this, key)}>
        {text}
      </MenuItem>
    ));
  }

  /**
   * @inheritDoc
   */
  render() {
    const {label, options, value} = this.props;
    const show = this.show.bind(this);
    const hide = this.hide.bind(this);
    const setNodeRef = this.setNodeRef.bind(this);
    const items = this.renderItems();
    const floatingTextLabel = options[value];

    return (
      <div>
        <TextField
          fullWidth
          marginForm
          label={floatingTextLabel}
          onClick={show}
          inputRef={setNodeRef}
          value={label}/>

        <Menu
          anchorEl={this.state.nodeRef}
          onRequestClose={hide}
          open={this.state.opened}>
          {items}
        </Menu>
      </div>
    );
  }
}
