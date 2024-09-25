import "../assets/styles/Order.css";
function Order({codigo, hora, fecha, onClickOrder}) {
  return (
    <div className="orderborder">
      <button className="orderbutton" onClick={onClickOrder}>{codigo} {hora} {fecha}</button>
    </div>
  );
}
export default Order;

