<Switch>
    <Route path="/" exact component={Home} />
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
    <Route path="/slider" component={SliderContainer} />
    <Route path="/character/:id" component={CharacterDetail} />
</Switch>