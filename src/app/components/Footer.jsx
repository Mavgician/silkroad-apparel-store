function PageFooter() {
  return (
    <>
      <footer className="p-4 bg-dark text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-12">
              <h6 className="text-uppercase font-weight-bold">About Us</h6>
              <p>
                Our store was founded in 1860 by two best friends, John Henry R.
                Relucio and John Mark B. Ormido of New Haven, Connecticut. They
                have always had a passion for fashion and clothing design. When
                they shared a dorm room in college, Henry and John Mark began
                crafting their brand, image, and concept for their first clothing
                store they would be opening. They didn’t want to limit their
                concept to just young, trendy styles.
              </p>
            </div>
            <div className="col-md-4 col-sm-12">
              <h6 className="text-uppercase font-weight-bold">Contact</h6>
              <p>
                Aurora Blvd., Cubao, Quezon City, <br />Silkroad@silk.com
                <br />+63 905 456 4546
              </p>
            </div>
          </div>
        </div>
        <div className="text-center text-info">2023 Copyright</div>
      </footer>
    </>
  )
}

export { PageFooter }