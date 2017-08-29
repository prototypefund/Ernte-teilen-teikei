module PlaceForm
  @place_form = Proc.new do |f|
    f.inputs 'Name and Description' do
      f.input :name, as: :string
      f.input :url, as: :string
      f.input :description
    end
    f.inputs 'Location' do
      f.input :city, as: :string
      f.input :address, as: :string
      f.input :latitude
      f.input :longitude
    end
  end

  def self.form(f)
    @place_form.call(f)
  end
end
