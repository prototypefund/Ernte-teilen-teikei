ActiveAdmin.register Initiative do
  form do |f|
    PlaceForm.form(f)
    inputs 'Additional Initiative Info' do

    end
    actions
  end

  index do
    column :id , sortable: :id do |initiative|
      link_to initiative.id, [:admin, initiative]
    end
    column :name
    column :location
  end
end
