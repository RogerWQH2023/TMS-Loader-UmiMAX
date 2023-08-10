function LayerInfo(props) {
  return (
    <div>
      <p>
        <b>图层名称：</b>
        {props.layer?.[0].name}
      </p>
      <p>
        <b>URL：</b>
        {props.layer?.[0].url}
      </p>
      <p>
        <b>描述：</b>
        {props.layer?.[0].description}
      </p>
    </div>
  );
}

export default LayerInfo;
