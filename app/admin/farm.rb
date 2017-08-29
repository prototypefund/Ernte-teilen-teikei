ActiveAdmin.register Farm do
  form do |f|
    PlaceForm.form(f)
    inputs 'Additional Farm Info' do
      input :vegetable_products, as: :select, collection: Farm.vegetable_products.values
      input :animal_products, as: :select, collection: Farm.animal_products.values
      input :beverages, as: :select, collection: Farm.beverages.values
      input :additional_product_information
      input :acts_ecological
      input :economical_behavior
      input :founded_at_year
      input :founded_at_month
      input :accepts_new_members, as: :select, collection: %w(yes no waitlist)
      input :maximum_members
      input :participation
    end
    actions
  end

  index do
    column :id , sortable: :id do |farm|
      link_to farm.id, [:admin, farm]
    end
    column :name
    column :location
  end
end
