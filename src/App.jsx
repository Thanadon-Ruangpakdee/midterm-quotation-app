import { useState, useRef } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import QuotationTable from "./QuotationTable";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();  // Add reference for discount

  const [dataItems, setDataItems] = useState([]);
  const [ppu, setPpu] = useState(products[0].price);
  const [quantity, setQuantity] = useState(1);  // Initialize quantity to 1

  const addItem = () => {
    let item = products.find((v) => itemRef.current.value === v.code);

    const newItem = {
      item: item.name,
      ppu: parseFloat(ppuRef.current.value),
      qty: parseFloat(qtyRef.current.value),
      discount: parseFloat(discountRef.current.value) || 0,  // Add discount to new item
    };

    // Check for redundant items
    let itemIndex = dataItems.findIndex(
      (dataItem) => dataItem.item === newItem.item && dataItem.ppu === newItem.ppu
    );

    if (itemIndex >= 0) {
      // Item is redundant, update the existing item
      let updatedDataItems = [...dataItems];
      updatedDataItems[itemIndex].qty += newItem.qty;
      updatedDataItems[itemIndex].discount += newItem.discount;
      setDataItems(updatedDataItems);
    } else {
      // Item is unique, add as new item
      setDataItems([...dataItems, newItem]);
    }

    // Reset quantity and discount fields
    setQuantity(1);
    discountRef.current.value = "";
  };

  const clearDataItems = () => {
    setDataItems([]);
  };

  const deleteByIndex = (index) => {
    let newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  };

  const productChange = () => {
    let item = products.find((v) => itemRef.current.value === v.code);
    setPpu(item.price);
  };

  return (
    <Container>
      <Row>
        <Col md={4} style={{ backgroundColor: "#e4e4e4" }}>
          <Row>
            <Col>
              Item
              <Form.Select ref={itemRef} onChange={productChange}>
                {
                  products.map((p) => (
                    <option key={p.code} value={p.code}>
                      {p.name}
                    </option>
                  ))
                }
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Price Per Unit</Form.Label>
              <Form.Control type="number" ref={ppuRef} value={ppu} onChange={e => setPpu(ppuRef.current.value)} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" ref={qtyRef} value={quantity} onChange={e => setQuantity(parseFloat(e.target.value))} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Discount</Form.Label> {/* Add Discount Input */}
              <Form.Control type="number" ref={discountRef} />
            </Col>
          </Row>
          <Row>
            <Col>
            <hr />
              <div className="d-grid gap-2">
            <Button variant="primary" onClick={addItem}>
              Add
            </Button>
          </div>
            </Col>
          </Row>
        </Col>
        <Col md={8}>
          <QuotationTable data={dataItems} clearDataItems={clearDataItems} deleteByIndex={deleteByIndex} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
